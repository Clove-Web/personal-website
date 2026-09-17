/* personal/src/styles/base.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes.css";

const cursor = (file: string, fallback: string, hotspot = "0 0") =>
  `url('https://m.doughmination.gay/cursors/sandrone/${file}.png') ${hotspot}, ${fallback}`;

const PAGE_BG = `linear-gradient(135deg, ${vars.bg} 0%, ${vars.bgRaised} 60%, ${vars.bgDeep} 100%)`;

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html", {
  cursor: cursor("Normal", "auto"),
  background: PAGE_BG,
});

globalStyle("html, body", {
  height: "100%",
  overflowX: "hidden",
  overflowY: "auto",
});

globalStyle("body", {
  fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  display: "flex",
  justifyContent: "center",
  alignItems: "safe center",
  minHeight: ["100vh", "100dvh"],
  margin: 0,
  padding: "1.5rem 1rem",
  background: PAGE_BG,
  color: vars.text,
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  fontFamily: "Georgia, 'Iowan Old Style', 'Palatino Linotype', serif",
});

globalStyle(
  'a, button, [role="button"], [role="link"], [data-href], label[for], select, summary, .pc-name--link',
  { cursor: cursor("Link", "pointer", "4 0") },
);

globalStyle(
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]',
  { cursor: cursor("Text", "text", "4 9") },
);

globalStyle(".is-loading", { cursor: cursor("Busy", "wait") });
globalStyle(".is-progress", { cursor: cursor("Working", "progress") });

globalStyle('[title]:not(a):not(button), .help', {
  cursor: cursor("Help", "help"),
});

globalStyle(':disabled, [disabled], [aria-disabled="true"]', {
  cursor: cursor("Unavailable", "not-allowed"),
});

globalStyle('[draggable="true"]', {
  cursor: cursor("Move", "grab", "15 15"),
});

globalStyle(".crosshair", { cursor: cursor("Precision", "crosshair", "5 6") });
// No zoom-in/zoom-out cursors in the Sandrone pack; fall back to the browser's own.
globalStyle(".zoom-in", { cursor: "zoom-in" });
globalStyle(".zoom-out", { cursor: "zoom-out" });

globalStyle("body::before", {
  content: '""',
  position: "fixed",
  inset: 0,
  background: "url(https://m.doughmination.gay/img/bg/estrogen.svg) center / cover no-repeat",
  filter: "invert(86%) sepia(8%) saturate(900%) hue-rotate(190deg) brightness(105%)",
  opacity: 0.05,
  pointerEvents: "none",
  zIndex: 0,
});

globalStyle("body::after", {
  content: '""',
  position: "fixed",
  right: "0.5rem",
  bottom: "0.5rem",
  width: "clamp(96px, 14vw, 168px)",
  aspectRatio: "564 / 547",
  background: "url(https://m.doughmination.gay/img/bg/miku.png) center / contain no-repeat",
  opacity: 0.18,
  pointerEvents: "none",
  zIndex: 0,
});
