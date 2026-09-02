/* personal/src/styles/visitorCounter.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes.css";

const MONO = "'Comic Code', ui-monospace, monospace";

globalStyle("#visitor-counter", {
  position: "fixed",
  top: "1rem",
  right: "1rem",
  zIndex: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  transition: "opacity 0.6s ease, transform 0.6s ease",
});

globalStyle("#visitor-counter .vc-label", {
  fontSize: "0.65rem",
  letterSpacing: "0.06em",
  textTransform: "lowercase",
  color: vars.textMuted,
  fontFamily: MONO,
});

globalStyle(".vc-root", {
  fontFamily: MONO,
});

globalStyle(".vc-digits", {
  display: "flex",
  alignItems: "center",
  gap: 4,
  minHeight: 50,
});

globalStyle(".vc-digits img", {
  display: "block",
  imageRendering: "pixelated",
  width: 22.5,
  height: 50,
});

globalStyle(".vc-error", {
  fontSize: "0.7rem",
  color: vars.textMuted,
});