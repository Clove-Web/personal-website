/* personal/src/styles/pages/coolPeople.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "../themes.css";

globalStyle("body:has(.friend-grid) .hub-header", {
  position: "relative",
  zIndex: 1,
  marginBottom: "2rem",
});

globalStyle("body:has(.friends-wrap) .hub", { maxWidth: 960 });

globalStyle(".friend-grid", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "flex-start",
  marginBottom: "1.5rem",
  gap: "1.1rem",
  width: "100%",
});

globalStyle(".friends-disclaimer", {
  margin: "2.5rem auto 0",
  maxWidth: "60ch",
  textAlign: "center",
  fontSize: "0.8rem",
  lineHeight: 1.5,
  opacity: 0.6,
});

globalStyle(".friends-disclaimer a", {
  color: "inherit",
  textDecoration: "underline",
});

globalStyle(".presence-card.is-mini", {
  position: "static",
  top: "auto",
  left: "auto",
  right: "auto",
  bottom: "auto",
  zIndex: "auto",
  margin: 0,
  width: 300,
  maxWidth: "100%",
});

globalStyle(".presence-card.is-mini .pc-banner", { height: 84 });

globalStyle(".presence-card.is-mini .pc-bio", {
  maxHeight: "6.5em",
  overflowY: "auto",
});

globalStyle(".presence-card.is-mini .pc-name--link", { textDecoration: "none" });
globalStyle(".presence-card.is-mini .pc-name--link:hover", {
  textDecoration: "underline",
});

const TIER_TAGS: Record<string, { label: string; color: string }> = {
  "": { label: "[mutual] ", color: vars.textDim },
  closer: { label: "[closer] ", color: vars.accent },
  known: { label: "[known] ", color: vars.textSoft },
  wife: { label: "[wife] ", color: vars.accent },
  close: { label: "[close] ", color: vars.accentAlt },
  "active-alt": { label: "[alt] ", color: vars.sapphire },
  "dead-alt": { label: "[dead] ", color: vars.textFaint },
};

for (const [tier, { label, color }] of Object.entries(TIER_TAGS)) {
  const sel = tier
    ? `.presence-card.is-mini.tier-${tier} .pc-name::before`
    : ".presence-card.is-mini .pc-name::before";
  globalStyle(sel, {
    content: `"${label}"`,
    color,
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.02em",
    verticalAlign: "middle",
  });
}

globalStyle(".presence-card.is-mini .pc-name.is-gradient::before", {
  WebkitTextFillColor: "initial",
  color: vars.text,
});

globalStyle(".presence-card.is-mini.tier-dead-alt .pc-av-img", {
  filter: "grayscale(1) brightness(0.6)",
});

globalStyle(".presence-card.is-mini.tier-dead-alt .pc-name", {
  color: vars.textDim,
  textDecoration: "line-through",
});

globalStyle(".presence-card.is-mini.tier-dead-alt .pc-status", {
  display: "none",
});
