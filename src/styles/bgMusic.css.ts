/* personal/src/styles/bgMusic.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes.css";

globalStyle(".bgm-gate", {
  position: "fixed",
  inset: 0,
  zIndex: 2147483647,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  background: "rgba(17, 17, 27, 0.75)",
  backdropFilter: "blur(3px)",
  cursor: 'url("https://m.doughmination.gay/img/cursor/pointer_0.png"), pointer',
  opacity: 1,
  transition: "opacity 0.25s ease",
});

globalStyle(".bgm-gate[hidden]", {
  display: "none",
});

globalStyle(".bgm-gate.is-leaving", {
  opacity: 0,
});

globalStyle(".bgm-gate-panel", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.6rem",
  padding: "1.5rem 2rem",
  background: vars.bg,
  border: `1px solid ${vars.surfaceHi}`,
  borderRadius: 0,
  boxShadow: "6px 6px 0 rgba(0, 0, 0, 0.55)",
  textAlign: "center",
  pointerEvents: "none",
});

globalStyle(".bgm-gate-note", {
  margin: 0,
  color: vars.accent,
  fontWeight: 700,
  fontSize: "1rem",
});

globalStyle(".bgm-gate-hint", {
  margin: 0,
  color: vars.textMuted,
  fontSize: "0.75rem",
});
