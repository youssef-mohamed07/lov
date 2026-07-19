import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Locales sometimes injected by browsers / previews — site is French-only. */
const LOCALE_PREFIXES = new Set([
  "en",
  "en-us",
  "en-gb",
  "ar",
  "es",
  "de",
  "it",
  "pt",
  "nl",
  "zh",
  "ja",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0]?.toLowerCase();

  // Strip accidental locale prefixes → always land on home.
  if (first && LOCALE_PREFIXES.has(first)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Home-only: block every route except `/`.
  if (pathname !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|.*\\..*).*)"],
};
