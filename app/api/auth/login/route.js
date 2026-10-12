import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { createSessionToken, SESSION_MAX_AGE_SECONDS } from "@/lib/admin-session";

function safeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export async function POST(request) {
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !safeEqual(password, expected)) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const token = await createSessionToken();
  (await cookies()).set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });

  return NextResponse.json({ success: true });
}