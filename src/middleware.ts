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
  const first = pathname.split("/").filter(Boolean)[0]?.toLowerCase();

  if (!first || !LOCALE_PREFIXES.has(first)) {
    return NextResponse.next();
  }

  const stripped = pathname.replace(new RegExp(`^/${first}`, "i"), "") || "/";
  const url = request.nextUrl.clone();
  url.pathname = stripped;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|.*\\..*).*)"],
};
