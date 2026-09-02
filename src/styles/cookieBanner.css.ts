/* personal/src/styles/cookieBanner.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes.css";

const MONO = "'Comic Code', ui-monospace, monospace";

globalStyle(".cookie-banner", {
  position: "fixed",
  left: "1rem",
  right: "1rem",
  bottom: "1rem",
  zIndex: 50,
  margin: "0 auto",
  maxWidth: 640,
  padding: "1.1rem 1.2rem",
  background: vars.surface,
  border: `1px solid ${vars.surfaceHi}`,
  borderRadius: 0,
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.45)",
  fontFamily: MONO,
  color: vars.textSoft,
});

globalStyle(".cb-title", {
  margin: 0,
  fontSize: "0.85rem",
  fontWeight: 700,
  letterSpacing: "0.02em",
  color: vars.text,
});

globalStyle(".cb-text", {
  margin: "0.5rem 0 0",
  fontSize: "0.78rem",
  lineHeight: 1.55,
  color: vars.textMuted,
});

globalStyle(".cb-link", {
  color: vars.accent,
  textDecoration: "underline",
});

globalStyle(".cb-actions", {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginTop: "1rem",
});

globalStyle(".cb-btn", {
  flex: "1 1 auto",
  minWidth: 140,
  padding: "0.5rem 0.9rem",
  fontFamily: MONO,
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.03em",
  textTransform: "lowercase",
  border: `1px solid ${vars.surfaceHigher}`,
  background: vars.surfaceHi,
  color: vars.textSoft,
  cursor: "inherit",
  transition: "background 0.15s ease, border-color 0.15s ease",
  "@media": {
    "(max-width: 640px)": {
      flexBasis: "100%",
    },
  },
});

globalStyle(".cb-btn:hover", {
  background: vars.surfaceHigher,
  borderColor: vars.accent,
});

globalStyle(".cb-btn.cb-primary", {
  background: vars.accent,
  borderColor: vars.accent,
  color: "#1a0f14",
});

globalStyle(".cb-btn.cb-primary:hover", {
  background: vars.accentAlt,
  borderColor: vars.accentAlt,
});

globalStyle(".cb-panel", {
  marginTop: "1rem",
  paddingTop: "0.9rem",
  borderTop: `1px solid ${vars.surfaceHi}`,
  display: "flex",
  flexDirection: "column",
  gap: "0.9rem",
});

globalStyle(".cb-row", {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "1rem",
});

globalStyle(".cb-row-main", {
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
});

globalStyle(".cb-row-label", {
  fontSize: "0.78rem",
  fontWeight: 700,
  color: vars.text,
});

globalStyle(".cb-row-desc", {
  fontSize: "0.72rem",
  lineHeight: 1.5,
  color: vars.textMuted,
});

globalStyle(".cb-always", {
  flexShrink: 0,
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "lowercase",
  color: vars.textDim,
  whiteSpace: "nowrap",
  paddingTop: "0.1rem",
});

globalStyle(".cb-toggle", {
  flexShrink: 0,
  width: 18,
  height: 18,
  marginTop: "0.1rem",
  accentColor: vars.accent,
  cursor: "inherit",
});
