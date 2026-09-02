/* personal/src/styles/sections.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes.css";

globalStyle(".section", {
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
  width: "100%",
});

globalStyle(".section-title", {
  margin: 0,
  fontSize: "1.1rem",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.accentAlt,
});

globalStyle(".section-subtitle", {
  margin: "-1.1rem 0 0",
  fontSize: "1.1rem",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "lowercase",
  color: vars.surfaceHigher,
});
