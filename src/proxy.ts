/* personal/src/proxy.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  LOCALE_PREFIXES,
  isLanguage,
  localeFromPathname,
  matchLanguage,
  parseAcceptLanguage,
  stripLocalePrefix,
} from "@/i18n/config";

const LANG_COOKIE = "lang";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function proxy(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;

  const language = localeFromPathname(pathname);

  if (language) {
    const url = request.nextUrl.clone();
    url.pathname = stripLocalePrefix(pathname);

    const response = NextResponse.rewrite(url);
    response.cookies.set(LANG_COOKIE, language, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
    return response;
  }

  const savedLang = request.cookies.get(LANG_COOKIE)?.value;

  const preferred =
    savedLang && isLanguage(savedLang)
      ? savedLang
      : matchLanguage(parseAcceptLanguage(request.headers.get("accept-language")));

  const suffix = pathname === "/" ? "" : pathname;

  const url = request.nextUrl.clone();
  url.pathname = `/${LOCALE_PREFIXES[preferred]}${suffix}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
