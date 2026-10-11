import { NextResponse } from "next/server";

export default function proxy(request) {
  const { pathname } = request.nextUrl;

  // Ayrı ürün sayfası kaldırıldı -> kategori sayfası
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

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin/login";

  if (isAdminRoute && !isLoginRoute) {
    const adminSession = request.cookies.get("admin_session");

    if (!adminSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/categorii/:path*"],
};