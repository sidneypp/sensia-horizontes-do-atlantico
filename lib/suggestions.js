import { randomUUID } from "node:crypto";

export const SUGGESTION_VOTER_COOKIE = "sensia_suggestion_voter";
export const SUGGESTION_TOWERS = ["Torre 1", "Torre 2"];
export const SUGGESTION_CATEGORIES = ["Manutenção", "Segurança", "Convivência", "Lazer", "Melhorias", "Outros"];
export const SUGGESTION_STATUSES = ["Nova", "Em análise", "Em andamento", "Concluída"];

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateSuggestionInput(input) {
  const name = cleanText(input?.name);
  const apartment = cleanText(input?.apartment);
  const tower = cleanText(input?.tower);
  const category = cleanText(input?.category);
  const title = cleanText(input?.title);
  const description = cleanText(input?.description);

  if (name.length < 2 || name.length > 80) return { error: "Informe seu nome (entre 2 e 80 caracteres)." };
  if (apartment.length < 1 || apartment.length > 20) return { error: "Informe um apartamento válido." };
  if (!SUGGESTION_TOWERS.includes(tower)) return { error: "Selecione uma torre válida." };
  if (!SUGGESTION_CATEGORIES.includes(category)) return { error: "Selecione uma categoria válida." };
  if (title.length < 5 || title.length > 120) return { error: "O título deve ter entre 5 e 120 caracteres." };
  if (description.length < 10 || description.length > 2000) return { error: "Descreva a sugestão em pelo menos 10 caracteres." };

  return {
    value: { name, apartment, tower, category, title, description },
  };
}

export function isValidSuggestionId(value) {
  return typeof value === "string" && uuidPattern.test(value);
}

export function getVoterId(request) {
  const currentValue = request.cookies.get(SUGGESTION_VOTER_COOKIE)?.value;
  return uuidPattern.test(currentValue || "") ? currentValue : randomUUID();
}

export function setVoterCookie(response, voterId) {
  response.cookies.set({
    name: SUGGESTION_VOTER_COOKIE,
    value: voterId,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export function toPublicSuggestion(row, { votes = 0, voted = false } = {}) {
  const firstName = cleanText(row.author_name).split(/\s+/)[0] || "Morador";

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    status: SUGGESTION_STATUSES.includes(row.status) ? row.status : "Nova",
    createdAt: row.created_at,
    authorLabel: `${firstName} · ${row.tower}`,
    votes,
    voted,
  };
}
