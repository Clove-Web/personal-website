/* personal/src/components/chrome/adSense.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useEffect, useState } from "react";
import { readConsent, subscribeConsent } from "@scripts/consent";

/*
 * Google AdSense loader, gated on the `advertising` consent category.
 *
 *   - The publisher ID comes from NEXT_PUBLIC_ADSENSE_ID, defaulting to the
 *     site's own `ca-pub-…`. It is public by design (it ends up in the page),
 *     so a default is fine; the env var just lets a fork override it.
 *   - adsbygoogle.js is injected ONLY after the visitor allows advertising
 *     cookies in the banner. Nothing from Google's ad stack loads before that.
 *   - Ads are always requested NON-PERSONALIZED (requestNonPersonalizedAds = 1)
 *     — set before any <ins> unit is pushed. This keeps us out of "personalized
 *     ads need a certified CMP" territory while still needing consent, because
 *     even non-personalized ads set frequency-capping / fraud cookies.
 *   - Withdrawing consent can't unload a running script; AdUnit stops rendering
 *     units immediately and a reload clears the rest. Same limitation as GA.
 *
 * This component renders nothing — it just loads the library. Individual slots
 * are placed with <AdUnit slot="…" /> (adUnit.tsx).
 */

export const ADSENSE_ID =
  process.env.NEXT_PUBLIC_ADSENSE_ID ?? "ca-pub-9418323669012622";

declare global {
  interface Window {
    adsbygoogle?: unknown[] & { requestNonPersonalizedAds?: number };
    __adsLoaded?: boolean;
  }
}

/** True once the visitor has opted into advertising cookies. */
export function useAdConsent(): boolean {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(readConsent()?.advertising === true);
    sync();
    return subscribeConsent(sync);
  }, []);

  return allowed;
}

function loadAdSense(): void {
  if (window.__adsLoaded) return;
  window.__adsLoaded = true;

  // Must exist, and be set to non-personalized, before the first unit pushes.
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.requestNonPersonalizedAds = 1;

  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" +
    `?client=${encodeURIComponent(ADSENSE_ID)}`;
  document.head.appendChild(script);
}

export default function AdSense() {
  const allowed = useAdConsent();

  useEffect(() => {
    if (allowed) loadAdSense();
  }, [allowed]);

  return null;
}
