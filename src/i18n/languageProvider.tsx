/* personal/src/i18n/languageProvider.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { DEFAULT_LANGUAGE, directionFor, localeFromPathname, localizedPath, type Language } from "./config";
import { dictionaries } from "./dictionaries";
import { resolve, type TranslationKey } from "./translate";
import type { Dictionary } from "./locales/en";

const STORAGE_KEY = "lang";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function persist(next: Language) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
    document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
  } catch {
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const lang = localeFromPathname(pathname) ?? DEFAULT_LANGUAGE;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = directionFor(lang);
    persist(lang);
  }, [lang]);

  const setLang = useCallback(
    (next: Language) => {
      persist(next);
      router.push(localizedPath(pathname, next));
    },
    [pathname, router],
  );

  const t = useCallback((key: TranslationKey) => resolve(dictionaries[lang], key), [lang]);

  const value = useMemo(() => ({ lang, setLang, t, dict: dictionaries[lang] }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
