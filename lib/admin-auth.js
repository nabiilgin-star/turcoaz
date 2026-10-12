import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/admin-session";

export async function isAdmin() {
  const token = (await cookies()).get("admin_session")?.value;
  return verifySessionToken(token);
}

// Call at the top of every server action / admin API handler.
export async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }
}