/* personal/src/i18n/config.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

export const SUPPORTED_LANGUAGES = [
  "en",
  "ja",
  "es",
  "nl",
  "de",
  "zh",
  "pt",
  "ko",
  "it",
  "ru",
  "pl",
  "tr",
  "ar",
] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  ja: "日本語",
  es: "Español",
  nl: "Nederlands",
  de: "Deutsch",
  zh: "简体中文",
  pt: "Português",
  ko: "한국어",
  it: "Italiano",
  ru: "Русский",
  pl: "Polski",
  tr: "Türkçe",
  ar: "العربية",
};

export const LOCALE_PREFIXES: Record<Language, string> = {
  en: "en",
  ja: "ja",
  es: "es",
  nl: "nl",
  de: "de",
  zh: "zh",
  pt: "pt",
  ko: "ko",
  it: "it",
  ru: "ru",
  pl: "pl",
  tr: "tr",
  ar: "ar",
};

const PREFIX_TO_LANGUAGE: Record<string, Language> = {
  en: "en",
  ja: "ja",
  es: "es",
  nl: "nl",
  de: "de",
  zh: "zh",
  pt: "pt",
  ko: "ko",
  it: "it",
  ru: "ru",
  pl: "pl",
  tr: "tr",
  ar: "ar",
};

const RTL_LANGUAGES: ReadonlySet<Language> = new Set(["ar"]);

export function isRtl(language: Language): boolean {
  return RTL_LANGUAGES.has(language);
}

export function directionFor(language: Language): "rtl" | "ltr" {
  return isRtl(language) ? "rtl" : "ltr";
}

export function isLanguage(value: string): value is Language {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

export function prefixToLanguage(segment: string): Language | null {
  return PREFIX_TO_LANGUAGE[segment] ?? null;
}

export function localeFromPathname(pathname: string): Language | null {
  const firstSegment = pathname.split("/")[1] ?? "";
  return prefixToLanguage(firstSegment);
}

export function stripLocalePrefix(pathname: string): string {
  const language = localeFromPathname(pathname);
  if (!language) return pathname || "/";

  const prefix = LOCALE_PREFIXES[language];
  const rest = pathname.slice(prefix.length + 1);
  return rest || "/";
}

export function localizedPath(pathname: string, language: Language): string {
  const rest = stripLocalePrefix(pathname);
  const suffix = rest === "/" ? "" : rest;
  return `/${LOCALE_PREFIXES[language]}${suffix}`;
}

export function matchLanguage(tags: readonly string[]): Language {
  for (const tag of tags) {
    const base = tag.split("-")[0]?.toLowerCase();
    if (base && isLanguage(base)) return base;
  }
  return DEFAULT_LANGUAGE;
}

export function parseAcceptLanguage(header: string | null): string[] {
  if (!header) return [];
  return header
    .split(",")
    .map((part) => part.split(";")[0]?.trim() ?? "")
    .filter(Boolean);
}

export function detectLanguage(): Language {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;

  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  return matchLanguage(candidates);
}
