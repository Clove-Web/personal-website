/* functions/_middleware.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import {
  LOCALE_PREFIXES,
  isLanguage,
  localeFromPathname,
  matchLanguage,
  parseAcceptLanguage,
  stripLocalePrefix,
} from "../src/i18n/config";

const LANG_COOKIE = "lang";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface EventContext {
  request: Request;
  next: (
    input?: Request | string,
    init?: RequestInit,
  ) => Promise<Response>;
}

export const onRequest = async (
  context: EventContext,
): Promise<Response> => {
  const { request, next } = context;

  const url = new URL(request.url);
  const pathname = url.pathname;
  const search = url.search;

  const lastSegment = pathname.split("/").pop() ?? "";
  const hasExtension = lastSegment.includes(".");

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return next();
  }

  const language = localeFromPathname(pathname);

  if (language) {
    const flatUrl = new URL(request.url);
    flatUrl.pathname = stripLocalePrefix(pathname);

    const rewritten = await next(new Request(flatUrl.toString(), request));

    if (hasExtension) {
      return rewritten;
    }

    const response = new Response(rewritten.body, rewritten);
    response.headers.append(
      "Set-Cookie",
      `${LANG_COOKIE}=${language}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`,
    );
    return response;
  }

  if (hasExtension) {
    return next();
  }

  const savedLang = readCookie(request.headers.get("cookie"), LANG_COOKIE);

  const preferred =
    savedLang && isLanguage(savedLang)
      ? savedLang
      : matchLanguage(
          parseAcceptLanguage(request.headers.get("accept-language")),
        );

  const suffix = pathname === "/" ? "" : pathname;

  const target = new URL(request.url);
  target.pathname = `/${LOCALE_PREFIXES[preferred]}${suffix}`;
  target.search = search;

  return Response.redirect(target.toString(), 307);
};

function readCookie(
  header: string | null,
  name: string,
): string | null {
  if (!header) return null;

  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}
