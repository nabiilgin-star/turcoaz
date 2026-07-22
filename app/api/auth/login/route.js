import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { password } = body;

  if (password === process.env.ADMIN_PASSWORD) {
    
    (await cookies()).set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
