import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "sensia_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

function getSessionSecret() {
  return process.env.PORTAL_SESSION_SECRET || process.env.PORTAL_PASSWORD || "";
}

function sign(value) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function checkPassword(input) {
  const configuredPassword = process.env.PORTAL_PASSWORD || "";

  if (!configuredPassword || typeof input !== "string") {
    return false;
  }

  return safeCompare(input, configuredPassword);
}

export function createSessionToken() {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = `${issuedAt}.sensia-portal`;

  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token) {
  if (!token || !getSessionSecret()) {
    return false;
  }

  const [issuedAt, marker, signature] = token.split(".");
  const payload = `${issuedAt}.${marker}`;
  const timestamp = Number(issuedAt);
  const age = Math.floor(Date.now() / 1000) - timestamp;

  if (marker !== "sensia-portal" || !Number.isSafeInteger(timestamp) || age < 0 || age > SESSION_MAX_AGE) {
    return false;
  }

  return safeCompare(signature, sign(payload));
}

export function hasValidSession(request) {
  return isValidSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}
