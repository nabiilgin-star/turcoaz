import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  (await cookies()).delete("admin_session");
  return NextResponse.json({ success: true });
}
