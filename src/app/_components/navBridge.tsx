/* personal/src/app/_components/navBridge.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { DEFAULT_LANGUAGE, localeFromPathname, localizedPath } from "@/i18n/config";

export default function NavBridge() {
  const router = useRouter();

  useEffect(() => {
    const w = window as unknown as {
      ctpNavigate?: (url: string) => void;
    };
    w.ctpNavigate = (url: string) => {
      try {
        const dest = new URL(url, location.href);
        if (dest.origin === location.origin) {
          const active = localeFromPathname(location.pathname) ?? DEFAULT_LANGUAGE;
          const localized = localizedPath(dest.pathname, active);
          router.push(localized + dest.search + dest.hash);
        } else {
          location.href = url;
        }
      } catch {
        location.href = url;
      }
    };
  }, [router]);

  return null;
}
