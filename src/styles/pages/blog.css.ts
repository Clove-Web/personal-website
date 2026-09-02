/* personal/src/styles/pages/blog.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "../themes.css";

globalStyle("#blog-cards", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "1.25rem",
  width: "100%",
  maxWidth: 960,
  margin: "1.5rem auto 0",
  padding: "0 0.25rem",
  position: "relative",
  zIndex: 1,
  "@media": {
    "(max-width: 480px)": { gridTemplateColumns: "1fr" },
  },
});

globalStyle("#blog-cards.is-loading", {
  minHeight: 120,
});

globalStyle(".blog-card", {
  display: "flex",
  flexDirection: "column",
  textDecoration: "none",
  color: vars.text,
  background: vars.bgRaised,
  border: `1px solid ${vars.surface}`,
  borderRadius: 14,
  overflow: "hidden",
  transition:
    "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
});

globalStyle(".blog-card:hover, .blog-card:focus-visible", {
  transform: "translateY(-3px)",
  borderColor: vars.accent,
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
});

globalStyle(".blog-card:focus-visible", {
  outline: `2px solid ${vars.accent}`,
  outlineOffset: 2,
});

globalStyle(".blog-card-thumb", {
  width: "100%",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  background: vars.bgDeep,
});

globalStyle(".blog-card-thumb img", {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

globalStyle(".blog-card-body", {
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  padding: "1rem 1.1rem 1.2rem",
});

globalStyle(".blog-card-date", {
  fontSize: "0.78rem",
  fontWeight: 600,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  color: vars.textMuted,
});

globalStyle(".blog-card-title", {
  margin: 0,
  fontSize: "1.15rem",
  lineHeight: 1.3,
  color: vars.text,
});

globalStyle(".blog-card-excerpt", {
  margin: 0,
  fontSize: "0.92rem",
  lineHeight: 1.45,
  color: vars.textMuted,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

globalStyle(".blog-empty", {
  gridColumn: "1 / -1",
  textAlign: "center",
  padding: "2rem 1rem",
  color: vars.textMuted,
  fontSize: "0.95rem",
});

globalStyle("body:has(.blog-contents)", {
  height: "auto",
  minHeight: "100dvh",
  overflowY: "auto",
  alignItems: "flex-start",
  paddingTop: "2.5rem",
  paddingBottom: "2.5rem",
});

globalStyle(".blog-header", {
  width: "100%",
  maxWidth: 680,
  margin: "0 auto 2rem",
  textAlign: "center",
});

globalStyle(".blog-header h1", {
  margin: 0,
  fontSize: "2rem",
  fontWeight: 700,
  color: vars.accent,
});

globalStyle(".blog-header .blog-meta", {
  marginTop: "0.35rem",
  color: vars.textMuted,
  fontSize: "0.85rem",
  letterSpacing: "0.02em",
});

globalStyle(".blog-contents", {
  width: "100%",
  maxWidth: 680,
  margin: "0 auto",
  padding: "0 0.5rem",
  textAlign: "left",
  color: vars.text,
  lineHeight: 1.7,
  position: "relative",
  zIndex: 1,
});

globalStyle(".blog-contents p", { margin: "0 0 1.1rem" });

globalStyle(".blog-contents img", {
  maxWidth: "100%",
  borderRadius: 12,
  margin: "1rem 0",
});

globalStyle(".blog-contents h2, .blog-contents h3", {
  color: vars.accent,
  margin: "1.6rem 0 0.6rem",
});

globalStyle(".blog-contents a", { color: vars.info });
globalStyle(".blog-contents a:hover", { textDecoration: "underline" });

globalStyle(".warning", {
  width: "100%",
  maxWidth: 680,
  margin: "2.5rem auto 2.5rem",
  padding: "1.15rem 1.25rem",
  borderRadius: 12,
  border: `1px solid ${vars.danger}`,
  borderLeft: `6px solid ${vars.danger}`,
  background: "rgba(209, 95, 140, 0.12)",
  color: vars.text,
  fontSize: "0.95rem",
  lineHeight: 1.6,
  boxShadow: "0 4px 16px rgba(209, 95, 140, 0.2)",
  scrollMarginTop: "2rem",
});

globalStyle(".warning b", {
  color: vars.danger,
  letterSpacing: "0.01em",
});

globalStyle(".warning-actions", {
  marginTop: "1rem",
});

globalStyle(".warning-proceed", {
  appearance: "none",
  cursor: "pointer",
  border: `1px solid ${vars.danger}`,
  background: vars.danger,
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "0.9rem",
  padding: "0.6rem 1.15rem",
  borderRadius: 999,
  transition: "transform 0.15s ease, opacity 0.15s ease",
});

globalStyle(".warning-proceed:hover", {
  transform: "translateY(-1px)",
  opacity: 0.92,
});

globalStyle(".warning-proceed:focus-visible", {
  outline: `2px solid ${vars.accent}`,
  outlineOffset: 2,
});

globalStyle(".blog-gate-body", {
  filter: "blur(12px)",
  pointerEvents: "none",
  userSelect: "none",
  transition: "filter 0.4s ease",
});

globalStyle(".blog-gate-body.is-revealed", {
  filter: "none",
  pointerEvents: "auto",
  userSelect: "auto",
});

globalStyle(".disclaimer", {
  width: "100%",
  maxWidth: 680,
  margin: "1.5rem auto",
  padding: "0.85rem 1.1rem",
  borderRadius: 8,
  borderLeft: `4px solid ${vars.info}`,
  background: "rgba(154, 163, 194, 0.12)",
  color: vars.textMuted,
  fontSize: "0.88rem",
  lineHeight: 1.55,
});

globalStyle(".disclaimer::before", {
  content: '"ℹ Transparency Note"',
  display: "block",
  marginBottom: "0.3rem",
  fontWeight: 700,
  fontSize: "0.82rem",
  letterSpacing: "0.02em",
  color: vars.info,
});
