/* personal/src/components/chrome/analytics.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { readConsent, subscribeConsent } from "@scripts/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaLoaded?: boolean;
  }
}

function loadGtag(id: string): void {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", id, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

function disableGtag(id: string): void {
  (window as unknown as Record<string, boolean>)[`ga-disable-${id}`] = true;

  const stamp = "Thu, 01 Jan 1970 00:00:00 GMT";
  for (const name of ["_ga", `_ga_${id.replace(/^G-/, "")}`, "_gid"]) {
    document.cookie = `${name}=; path=/; expires=${stamp}`;
    document.cookie =
      `${name}=; path=/; domain=.doughmination.gay; expires=${stamp}`;
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;

    const sync = () => setEnabled(readConsent()?.analytics === true);
    sync();

    return subscribeConsent(sync);
  }, []);

  useEffect(() => {
    if (!GA_ID) return;

    if (enabled) loadGtag(GA_ID);
    else if (window.__gaLoaded) disableGtag(GA_ID);
  }, [enabled]);

  useEffect(() => {
    if (!GA_ID || !enabled || !window.gtag) return;

    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname, enabled]);

  return null;
}
