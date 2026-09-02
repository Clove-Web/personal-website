/* personal/src/components/chrome/adSense.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useEffect, useState } from "react";
import { readConsent, subscribeConsent } from "@scripts/consent";

export const ADSENSE_ID =
  process.env.NEXT_PUBLIC_ADSENSE_ID ?? "ca-pub-9418323669012622";

declare global {
  interface Window {
    adsbygoogle?: unknown[] & { requestNonPersonalizedAds?: number };
    __adsLoaded?: boolean;
  }
}

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
