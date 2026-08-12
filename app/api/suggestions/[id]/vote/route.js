import { NextResponse } from "next/server";

import { hasValidSession } from "../../../../../lib/session.js";
import { isSupabaseConfigured, supabaseRequest } from "../../../../../lib/supabase.js";
import {
  getVoterId,
  isValidSuggestionId,
  setVoterCookie,
} from "../../../../../lib/suggestions.js";

const privateHeaders = { "cache-control": "private, no-store" };

function unavailableResponse() {
  return NextResponse.json({ error: "Painel de sugestões indisponível no momento." }, { status: 503, headers: privateHeaders });
}

export async function POST(request, { params }) {
  if (!hasValidSession(request)) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return unavailableResponse();
  }

  const { id } = await params;

  if (!isValidSuggestionId(id)) {
    return NextResponse.json({ error: "Sugestão inválida." }, { status: 400, headers: privateHeaders });
  }

  const voterId = getVoterId(request);
  const encodedId = encodeURIComponent(id);
  const encodedVoterId = encodeURIComponent(voterId);

  try {
    const suggestions = await supabaseRequest(`suggestions?select=id&id=eq.${encodedId}`);

    if (!suggestions.length) {
      return NextResponse.json({ error: "Sugestão não encontrada." }, { status: 404, headers: privateHeaders });
    }

    const currentVotes = await supabaseRequest(`suggestion_votes?select=suggestion_id&suggestion_id=eq.${encodedId}&voter_id=eq.${encodedVoterId}`);
    const voted = currentVotes.length === 0;

    if (voted) {
      await supabaseRequest("suggestion_votes", {
        method: "POST",
        headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
        body: JSON.stringify({ suggestion_id: id, voter_id: voterId }),
      });
    } else {
      await supabaseRequest(`suggestion_votes?suggestion_id=eq.${encodedId}&voter_id=eq.${encodedVoterId}`, {
        method: "DELETE",
        headers: { Prefer: "return=minimal" },
      });
    }

    const votes = await supabaseRequest(`suggestion_votes?select=suggestion_id&suggestion_id=eq.${encodedId}`);
    const response = NextResponse.json({ id, voted, votes: votes.length }, { headers: privateHeaders });
    setVoterCookie(response, voterId);
    return response;
  } catch (error) {
    console.error("Não foi possível registrar o apoio à sugestão.", error);
    return unavailableResponse();
  }
}
