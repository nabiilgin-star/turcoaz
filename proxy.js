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

  // GECICI KILIT: imzali oturum dogrulamasi yazilana kadar tum /admin istekleri kapali
  if (pathname.startsWith("/admin")) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/categorii/:path*"],
};