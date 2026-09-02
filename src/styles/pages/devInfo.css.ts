/* personal/src/styles/pages/devInfo.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle, globalKeyframes } from "@vanilla-extract/css";
import { vars } from "../themes.css";

const POINTER = 'url("https://m.doughmination.gay/img/cursor/pointer_0.png"), pointer';

globalStyle(
  "html:has(.dev-info), body:has(.dev-info), html:has(.dev-info-page), body:has(.dev-info-page)",
  {
    height: "auto",
    minHeight: "100dvh",
    overflowY: "auto",
  },
);

globalStyle("body:has(.dev-info), body:has(.dev-info-page)", {
  alignItems: "flex-start",
});

globalStyle("body:has(.dev-info) .hub", { maxWidth: 860 });

globalStyle(".dev-info", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "0.5rem",
  margin: "0 auto",
  paddingBottom: "4.5rem",
});

globalStyle(".dev-info-page", {
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: 640,
  margin: "0 auto",
  paddingBottom: "4.5rem",
});

globalStyle(".dev-info-page .hub-header", { marginBottom: "1.5rem" });

globalStyle(".info-section", {
  background: vars.surface,
  border: `1px solid ${vars.surfaceHi}`,
  borderRadius: 0,
  padding: "0.85rem 1.25rem 0.95rem",
  marginBottom: "0.7rem",
});

globalStyle(".info-section .section-title", {
  textAlign: "left",
  fontSize: "0.82rem",
  marginBottom: "1rem",
});

globalStyle(".tech-icon", {
  position: "relative",
  width: 30,
  height: 30,
  display: "inline-block",
  transition: "transform 0.15s ease, filter 0.15s ease",
});

globalStyle(".tech-icon::before", {
  content: '""',
  position: "absolute",
  inset: 0,
  backgroundColor: "currentColor",
  WebkitMask: "var(--si) center / contain no-repeat",
  mask: "var(--si) center / contain no-repeat",
});

globalStyle(".tech-icon:hover", {
  transform: "translateY(-2px) scale(1.12)",
  filter: "drop-shadow(0 4px 8px currentColor)",
});

globalStyle(".tech-icon::after", {
  content: "attr(aria-label)",
  position: "absolute",
  bottom: "calc(100% + 8px)",
  left: "50%",
  transform: "translateX(-50%) translateY(4px)",
  padding: "0.25rem 0.5rem",
  borderRadius: 0,
  background: vars.bgDeep,
  border: "1px solid currentColor",
  color: vars.text,
  fontSize: "0.72rem",
  lineHeight: 1,
  whiteSpace: "nowrap",
  pointerEvents: "none",
  opacity: 0,
  transition: "opacity 0.15s ease, transform 0.15s ease",
  zIndex: 10,
});

globalStyle(".tech-icon:hover::after", {
  opacity: 1,
  transform: "translateX(-50%) translateY(0)",
});

globalStyle(".tech-icon", { color: vars.text });

globalStyle(".tech-stack .dev-info", {
  paddingBottom: 0,
  justifyContent: "flex-start",
});

globalStyle("details.info-section", {
  paddingBottom: "0.85rem",
  transition: "padding-bottom 0.15s ease",
});

globalStyle("details.info-section[open]", { paddingBottom: "1.15rem" });

globalStyle("summary.section-title", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  cursor: POINTER,
  listStyle: "none",
  userSelect: "none",
  marginBottom: 0,
  transition: "margin-bottom 0.15s ease, color 0.15s ease",
});

globalStyle("summary.section-title::-webkit-details-marker", { display: "none" });
globalStyle("summary.section-title::marker", { content: '""' });

globalStyle("summary.section-title:hover", { color: vars.accent });

globalStyle("summary.section-title:focus-visible", {
  outline: `2px solid ${vars.accent}`,
  outlineOffset: 3,
  borderRadius: 0,
});

globalStyle("summary.section-title::after", {
  content: '""',
  flex: "none",
  width: "0.5rem",
  height: "0.5rem",
  marginRight: "0.15rem",
  borderRight: "2px solid currentColor",
  borderBottom: "2px solid currentColor",
  transform: "rotate(45deg)",
  transition: "transform 0.2s ease",
});

globalStyle("details.info-section[open] > summary.section-title", {
  marginBottom: "0.75rem",
});

globalStyle("details.info-section[open] > summary.section-title::after", {
  transform: "rotate(-135deg)",
});

globalStyle(".hw-item", {
  textDecoration: "none",
  color: vars.text
});

globalStyle(".hw-intro", {
  margin: "0 0 0.9rem",
  fontSize: "0.8rem",
  color: vars.textMuted,
});

globalStyle(".hw-list", {
  display: "flex",
  flexDirection: "column",
  gap: "0.55rem",
  margin: 0,
});

globalStyle(".hw-row", {
  display: "grid",
  gridTemplateColumns: "8rem 1fr",
  gap: "0.7rem",
  alignItems: "baseline",
  "@media": { "(max-width: 560px)": { gridTemplateColumns: "6rem 1fr" } },
});

globalStyle(".hw-row dt", {
  fontSize: "0.72rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: vars.textMuted,
});

globalStyle(".hw-row dd", {
  margin: 0,
  fontSize: "0.88rem",
  color: vars.text
});

globalStyle(".ch-root", {
  vars: {
    "--ch-cell": "13px",
    "--ch-gap": "3px",
    "--ch-weekday-w": "30px",
    "--contrib-0": "#232a33",
    "--contrib-1": "#173f2c",
    "--contrib-2": "#1e7349",
    "--contrib-3": "#34ab68",
    "--contrib-4": "#5ce897",
    "--ch-muted": "#8b95a1",
    "--ch-text": "#d3dae2",
  },
  display: "block",
  width: "100%",
  maxWidth: "100%",
  color: "var(--ch-text)",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
});

globalStyle(".ch-count", {
  margin: "0 0 14px",
  fontSize: 13,
  color: "var(--ch-muted)",
  fontVariantNumeric: "tabular-nums",
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
});

globalStyle(".ch-scroll", {
  overflowX: "auto",
  paddingBottom: 4,
  scrollbarWidth: "thin",
  scrollbarColor: "var(--ch-muted) transparent",
});

globalStyle(".ch-scroll::-webkit-scrollbar", { height: 8 });
globalStyle(".ch-scroll::-webkit-scrollbar-thumb", {
  background: "var(--ch-muted)",
  borderRadius: 0,
});
globalStyle(".ch-scroll::-webkit-scrollbar-track", { background: "transparent" });

globalStyle(".ch-months", {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "var(--ch-cell)",
  gap: "var(--ch-gap)",
  marginLeft: "calc(var(--ch-weekday-w) + var(--ch-gap))",
  marginBottom: 6,
  height: 14,
  fontSize: 11,
  color: "var(--ch-muted)",
});

globalStyle(".ch-months span", {
  whiteSpace: "nowrap",
  lineHeight: "14px"
});

globalStyle(".ch-body", {
  display: "flex",
  gap: "var(--ch-gap)"
});

globalStyle(".ch-weekdays", {
  display: "grid",
  gridTemplateRows: "repeat(7, var(--ch-cell))",
  gap: "var(--ch-gap)",
  width: "var(--ch-weekday-w)",
  fontSize: 10,
  color: "var(--ch-muted)",
});

globalStyle(".ch-weekdays span", { lineHeight: "var(--ch-cell)" });

globalStyle(".ch-grid", {
  display: "grid",
  gridTemplateRows: "repeat(7, var(--ch-cell))",
  gridAutoFlow: "column",
  gridAutoColumns: "var(--ch-cell)",
  gap: "var(--ch-gap)",
});

globalKeyframes("ch-pop", { to: { opacity: 1 } });

globalStyle(".ch-day", {
  width: "var(--ch-cell)",
  height: "var(--ch-cell)",
  borderRadius: 0,
  outline: "1px solid rgba(255, 255, 255, 0.04)",
  outlineOffset: -1,
  opacity: 0,
  animation: "ch-pop 0.4s ease forwards",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 1
    },
  },
});

globalStyle(".ch-day:hover", { outline: "1px solid var(--ch-text)" });

for (let i = 0; i <= 4; i++) {
  globalStyle(`.ch-day.l${i}`, { background: `var(--contrib-${i})` });
}

globalStyle(".ch-legend", {
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginTop: 14,
  fontSize: 11,
  color: "var(--ch-muted)",
});

globalStyle(".ch-legend .ch-day", {
  animation: "none",
  opacity: 1
});
