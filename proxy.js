import { NextResponse } from "next/server";
import { verifySessionToken } from "./lib/admin-session";

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Separate product page removed -> category page
  if (pathname === "/categorii/profile-pvc/exen-6040a") {
    const url = request.nextUrl.clone();
    url.pathname = "/categorii/profile-pvc";
    return NextResponse.redirect(url, 308);
  }

  // Uppercase letters under /categorii -> permanent redirect to lowercase URL
  if (pathname.startsWith("/categorii") && /[A-Z]/.test(pathname) && !pathname.includes("%")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }

  // Admin area: a valid signed session is required (login page excepted)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_session")?.value;
    if (!(await verifySessionToken(token))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/categorii/:path*"],
};