/* personal/src/components/chrome/adUnit.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_ID, useAdConsent } from "./adSense";

/*
 * One AdSense slot. Renders nothing until the visitor has opted into
 * advertising cookies (so no ad markup exists on the page before consent),
 * then drops an <ins class="adsbygoogle"> and pushes it once.
 *
 * Usage — put it wherever a unit should appear (e.g. inside the top pop-down):
 *
 *   <AdUnit slot="1234567890" />
 *
 * `slot` is the ad-unit ID from your AdSense dashboard. `format` /
 * `responsive` map straight to data-ad-format / data-full-width-responsive.
 */

type Props = {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

// `window.adsbygoogle` is augmented once, in adSense.tsx.

const IS_PROD = process.env.NODE_ENV === "production";

export default function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className,
  style,
}: Props) {
  const allowed = useAdConsent();
  const pushed = useRef(false);

  useEffect(() => {
    if (!allowed || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // adsbygoogle.js not ready yet, or blocked — leave it for a later mount.
    }
  }, [allowed]);

  if (!allowed) return null;

  return (
    <ins
      className={`adsbygoogle ad-unit${className ? " " + className : ""}`}
      style={{ display: "block", ...style }}
      data-ad-client={ADSENSE_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
      // Belt-and-braces: unfilled impressions also stay non-personalized.
      data-npa-on-unfilled="true"
      // Keeps test traffic from looking like real impressions to Google.
      {...(IS_PROD ? {} : { "data-adtest": "on" })}
    />
  );
}
