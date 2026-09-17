/* personal/src/styles/fonts.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalFontFace } from "@vanilla-extract/css";

const CDN = "https://m.doughmination.gay/f";

// Site chrome uses system fonts (matches auth-server); these DDN faces stay
// because they render actual Discord Nitro nameplate styles on presence data,
// not site branding.
const DDN: Array<[family: string, file: string]> = [
  ["DDN 8Bit", "8Bit.woff2"],
  ["DDN Jellybean", "Jellybean.woff2"],
  ["DDN Medieval", "Medieval.woff2"],
  ["DDN Modern", "Modern.woff2"],
  ["DDN Sakura", "Sakura.woff2"],
  ["DDN Tempo", "Tempo.woff2"],
  ["DDN Vampyre", "Vampyre.woff2"],
  ["DDN gg sans", "gg%20sans.woff2"],
];

for (const [family, file] of DDN) {
  globalFontFace(family, {
    src: `url('${CDN}/discord/${file}') format('woff2')`,
    fontDisplay: "swap",
  });
}
