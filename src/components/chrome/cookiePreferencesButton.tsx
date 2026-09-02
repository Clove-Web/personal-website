/* personal/src/components/chrome/cookiePreferencesButton.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { playClickSound } from "@lib/sound";
import { openCookieSettings } from "@scripts/consent";

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="cb-btn cb-primary privacy-cookie-btn"
      onClick={() => {
        playClickSound();
        openCookieSettings();
      }}
    >
      change cookie preferences
    </button>
  );
}
