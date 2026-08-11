import { NextResponse } from "next/server";
import { getPrivateGuide } from "../../../lib/private-guide.js";
import { hasValidSession } from "../../../lib/session.js";

export async function GET(request) {
  if (!hasValidSession(request)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const guide = getPrivateGuide();

    return NextResponse.json(guide, {
      headers: {
        "cache-control": "private, no-store",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 503 });
  }
}
