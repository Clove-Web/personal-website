/* personal/src/components/chrome/adUnit.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_ID, useAdConsent } from "./adSense";

type Props = {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

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
      data-npa-on-unfilled="true"
      {...(IS_PROD ? {} : { "data-adtest": "on" })}
    />
  );
}
