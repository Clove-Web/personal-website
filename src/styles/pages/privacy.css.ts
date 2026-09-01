/* personal/src/styles/pages/privacy.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

/**
 * privacy.css.ts — the /privacy (Privacy & Cookies) page.
 *
 * A long text page: it renders a `.privacy-wrap` container, which
 * scroll-wrap.css.ts lists so html/body switch to scrollable + top-aligned.
 * Everything else here is plain prose styling.
 */
import { globalStyle } from "@vanilla-extract/css";
import { vars } from "../themes.css";

globalStyle("body:has(.privacy-wrap) .hub", {
  maxWidth: 760,
});

globalStyle(".privacy-wrap .hub-header", {
  marginBottom: "1.5rem",
});

globalStyle(".privacy-body", {
  width: "100%",
  textAlign: "left",
  fontSize: "0.86rem",
  lineHeight: 1.65,
  color: vars.textSoft,
});

globalStyle(".privacy-body h2", {
  marginTop: "2rem",
  marginBottom: "0.6rem",
  fontSize: "1rem",
  color: vars.text,
});

globalStyle(".privacy-body p", {
  margin: "0.6rem 0",
});

globalStyle(".privacy-body a", {
  color: vars.accent,
  textDecoration: "underline",
});

globalStyle(".privacy-body ul", {
  margin: "0.6rem 0",
  paddingLeft: "1.3rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
});

globalStyle(".privacy-body code", {
  fontFamily: "'Comic Code', ui-monospace, monospace",
  fontSize: "0.8rem",
  padding: "0.05rem 0.3rem",
  background: vars.surfaceHi,
  border: `1px solid ${vars.surfaceHigher}`,
});

globalStyle(".privacy-updated", {
  fontSize: "0.75rem",
  color: vars.textDim,
});

globalStyle(".privacy-cookie-btn", {
  marginTop: "1.5rem",
});
