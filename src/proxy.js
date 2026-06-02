import { NextResponse } from "next/server";

const locales = ["ar", "en"];
const defaultLocale = "ar";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to the default locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal Next.js paths and static files
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};
