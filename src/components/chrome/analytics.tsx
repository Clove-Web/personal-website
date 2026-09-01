/* personal/src/components/chrome/analytics.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { readConsent, subscribeConsent } from "@scripts/consent";

/*
 * Google Analytics 4 (gtag.js), gated on consent.
 *
 *   - The Measurement ID comes from NEXT_PUBLIC_GA_ID (set it in the Cloudflare
 *     Pages project settings). With no ID this component does nothing, so local
 *     builds and forks stay analytics-free.
 *   - The gtag.js <script> is injected only after the visitor has allowed
 *     analytics cookies in the banner. Nothing about Google loads before that.
 *   - Page views are sent manually on route change: the site navigates via the
 *     client router (NavBridge), so gtag's automatic first-load page_view is
 *     turned off and every view — including the first — is reported here.
 *   - Withdrawing consent sets the `ga-disable-<ID>` flag so gtag stops sending
 *     immediately; the _ga cookies are cleared best-effort and fully clear on
 *     the next load.
 */

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
  // Recognised by gtag.js — stops all further hits for this property.
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

  // Track consent.
  useEffect(() => {
    if (!GA_ID) return;

    const sync = () => setEnabled(readConsent()?.analytics === true);
    sync();

    return subscribeConsent(sync);
  }, []);

  // Load or disable gtag as consent flips.
  useEffect(() => {
    if (!GA_ID) return;

    if (enabled) loadGtag(GA_ID);
    else if (window.__gaLoaded) disableGtag(GA_ID);
  }, [enabled]);

  // One page_view per route change (and on first grant).
  useEffect(() => {
    if (!GA_ID || !enabled || !window.gtag) return;

    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname, enabled]);

  return null;
}
