/* personal/src/styles/scrollWrap.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";

const WRAPS = [".friends-wrap", ".selfies-wrap", ".privacy-wrap"];

for (const wrap of WRAPS) {
  globalStyle(`html:has(${wrap}), body:has(${wrap})`, {
    height: "auto",
    minHeight: "100dvh",
    overflowY: "auto",
  });
}

globalStyle("body:has(.friends-wrap), body:has(.privacy-wrap)", {
  alignItems: "flex-start",
});
