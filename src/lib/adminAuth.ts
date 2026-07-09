import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "autostore_admin_session";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!process.env.ADMIN_SESSION_TOKEN) {
    return false;
  }

  return sessionToken === process.env.ADMIN_SESSION_TOKEN;
}
