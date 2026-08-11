import { NextResponse } from "next/server";
import { checkPassword, createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "../../../../lib/session.js";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Não foi possível ler a solicitação." }, { status: 400 });
  }

  if (!process.env.PORTAL_PASSWORD) {
    return NextResponse.json({ error: "A senha do portal ainda não foi configurada." }, { status: 503 });
  }

  if (!checkPassword(body?.password)) {
    return NextResponse.json({ error: "Senha incorreta. Confira os dados e tente novamente." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: SESSION_COOKIE,
    value: createSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}
