import { auth } from "@/firebase";

/** Keep Firebase responsible for token refresh; never trust a client-supplied UID alone. */
export async function authenticatedFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const user = auth.currentUser;
  if (!user) throw new Error("Bu işlem için giriş yapmanız gerekiyor.");
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${await user.getIdToken()}`);
  return fetch(input, { ...init, headers });
}
