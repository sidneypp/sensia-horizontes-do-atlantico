const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseSecretKey);
}

export async function supabaseRequest(path, options = {}) {
  if (!isSupabaseConfigured()) {
    const error = new Error("SUPABASE_NOT_CONFIGURED");
    error.code = "SUPABASE_NOT_CONFIGURED";
    throw error;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      apikey: supabaseSecretKey,
      "content-type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = new Error(`Supabase request failed with status ${response.status}`);
    error.code = "SUPABASE_REQUEST_FAILED";
    error.status = response.status;
    throw error;
  }

  const responseBody = await response.text();

  return responseBody ? JSON.parse(responseBody) : null;
}
