import { NextResponse } from "next/server";

import { hasValidSession } from "../../../lib/session.js";
import { isSupabaseConfigured, supabaseRequest } from "../../../lib/supabase.js";
import {
  getVoterId,
  setVoterCookie,
  toPublicSuggestion,
  validateSuggestionInput,
} from "../../../lib/suggestions.js";

const privateHeaders = { "cache-control": "private, no-store" };

function unauthorizedResponse() {
  return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
}

function unavailableResponse(message = "Painel de sugestões indisponível no momento.", configured = true) {
  return NextResponse.json({ configured, error: message }, { status: 503, headers: privateHeaders });
}

export async function GET(request) {
  if (!hasValidSession(request)) {
    return unauthorizedResponse();
  }

  if (!isSupabaseConfigured()) {
    return unavailableResponse("Painel de sugestões ainda não configurado.", false);
  }

  const voterId = getVoterId(request);

  try {
    const [suggestions, votes] = await Promise.all([
      supabaseRequest("suggestions?select=id,title,description,author_name,tower,category,status,created_at&order=created_at.desc"),
      supabaseRequest("suggestion_votes?select=suggestion_id,voter_id"),
    ]);

    const voteCounts = new Map();
    const votedSuggestionIds = new Set();

    for (const vote of votes) {
      voteCounts.set(vote.suggestion_id, (voteCounts.get(vote.suggestion_id) || 0) + 1);
      if (vote.voter_id === voterId) {
        votedSuggestionIds.add(vote.suggestion_id);
      }
    }

    const response = NextResponse.json({
      configured: true,
      suggestions: suggestions.map((suggestion) => toPublicSuggestion(suggestion, {
        votes: voteCounts.get(suggestion.id) || 0,
        voted: votedSuggestionIds.has(suggestion.id),
      })),
    }, { headers: privateHeaders });

    setVoterCookie(response, voterId);
    return response;
  } catch (error) {
    console.error("Não foi possível carregar as sugestões.", error);
    return unavailableResponse();
  }
}

export async function POST(request) {
  if (!hasValidSession(request)) {
    return unauthorizedResponse();
  }

  if (!isSupabaseConfigured()) {
    return unavailableResponse("Painel de sugestões ainda não configurado.", false);
  }

  const body = await request.json().catch(() => null);
  const { value, error } = validateSuggestionInput(body);

  if (error) {
    return NextResponse.json({ error }, { status: 400, headers: privateHeaders });
  }

  try {
    const rows = await supabaseRequest("suggestions", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        title: value.title,
        description: value.description,
        author_name: value.name,
        apartment: value.apartment,
        tower: value.tower,
        category: value.category,
        status: "Nova",
      }),
    });

    return NextResponse.json({
      suggestion: toPublicSuggestion(rows[0], { votes: 0, voted: false }),
    }, { status: 201, headers: privateHeaders });
  } catch (requestError) {
    console.error("Não foi possível criar a sugestão.", requestError);
    return unavailableResponse();
  }
}
