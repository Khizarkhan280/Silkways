const KEY = "silkways_session";

// Called after a successful login. Stores token/user if the API sends them.
export function saveSession(data) {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({ at: Date.now(), token: data?.token ?? null, user: data?.user ?? null })
    );
  } catch {
    /* storage unavailable */
  }
}

export function isLoggedIn() {
  try {
    return Boolean(localStorage.getItem(KEY));
  } catch {
    return false;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
}