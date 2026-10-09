const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const registerUser = (payload) => request("/auth/register", payload); // { name, email, password }
export const loginUser = (payload) => request("/auth/login", payload);       // { email, password }