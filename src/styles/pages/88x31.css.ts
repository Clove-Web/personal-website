/* personal/src/styles/pages/88x31.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "../themes.css";

globalStyle("html:has(.button-page), body:has(.button-page)", {
  height: "auto",
  minHeight: "100dvh",
  overflowY: "auto",
});

globalStyle("body:has(.button-page)", {
  alignItems: "flex-start",
});

globalStyle("body:has(.button-page) .hub", {
  maxWidth: 560,
});

globalStyle(".button-page", {
  display: "flex",
  justifyContent: "center",
  paddingBottom: "4.5rem",
});

globalStyle(".button-wall", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "0.6rem",
  margin: "0 auto",
  "@media": {
    "(max-width: 640px)": { maxWidth: "100%" },
  },
});

globalStyle(".button-wall a", {
  display: "block",
  lineHeight: 0,
});

globalStyle(".button-wall img", {
  width: 132,
  height: 46,
  border: `1px solid ${vars.surfaceHi}`,
  borderRadius: 0,
  transition: "transform 0.12s ease, border-color 0.12s ease",
});

globalStyle(".button-wall a:hover img, .button-wall img:hover", {
  transform: "translateY(-2px)",
  borderColor: vars.accent,
});
