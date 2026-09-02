/* personal/src/components/chrome/i18nText.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/i18n/languageProvider";
import type { TranslationKey } from "@/i18n/translate";

export function Tr({
  k,
  vars,
}: {
  k: TranslationKey;
  vars?: Record<string, string | number>;
}): ReactNode {
  const { t } = useLanguage();
  let text = t(k);
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replace(`{${name}}`, String(value));
    }
  }
  return <>{text}</>;
}

export function TrLink({
  k,
  href,
  linkText,
  external = true,
}: {
  k: TranslationKey;
  href: string;
  linkText: string;
  external?: boolean;
}): ReactNode {
  const { t } = useLanguage();
  const [before, after = ""] = t(k).split("{link}");
  return (
    <>
      {before}
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
      >
        {linkText}
      </a>
      {after}
    </>
  );
}
