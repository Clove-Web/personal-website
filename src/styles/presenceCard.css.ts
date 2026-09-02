/* personal/src/styles/presenceCard.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes.css";

const ELLIPSIS = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
} as const;

globalStyle(".presence-card", {
  vars: { "--dc-accent": "245, 194, 231" },
  position: "fixed",
  top: "1rem",
  left: "1rem",
  zIndex: 6,
  width: "max-content",
  maxWidth: 280,
  background: vars.surface,
  border: `1px solid ${vars.surfaceHi}`,
  borderRadius: 0,
  boxShadow: "5px 5px 0 rgba(17, 17, 27, 0.6)",
  overflow: "hidden",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
});

globalStyle(".presence-card[hidden]", { display: "none" });

globalStyle(".presence-card.has-accent", {
  borderColor: "rgba(var(--dc-accent), 0.5)",
  boxShadow: "5px 5px 0 rgba(var(--dc-accent), 0.55)",
});

globalStyle(".pc-head", {
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  padding: "0.5rem 0.7rem",
});

globalStyle(".pc-avatar", {
  position: "relative",
  width: 40,
  height: 40,
  flexShrink: 0,
});

globalStyle(".pc-av-img", {
  width: 40,
  height: 40,
  borderRadius: 0,
  objectFit: "cover",
  display: "block",
  background: vars.bgDeep,
});

globalStyle(".pc-av-deco", {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 54,
  height: 54,
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
});

globalStyle(".presence-card:not(.is-mini) .pc-av-img", {
  borderRadius: "50%",
});

globalStyle(".pc-av-deco[hidden]", { display: "none" });

globalStyle(".pc-status", {
  position: "absolute",
  right: -1,
  bottom: -1,
  width: 12,
  height: 12,
  borderRadius: 0,
  border: `2.5px solid ${vars.surface}`,
  background: vars.textFaint,
});

const STATUS_COLOURS = {
  online: {
    dot: vars.success,
    text: vars.success
  },
  idle: {
    dot: vars.warning,
    text: vars.warning
  },
  dnd: {
    dot: vars.danger,
    text: vars.danger
  },
  offline: {
    dot: vars.textFaint,
    text: vars.textDim
  },
  streaming: {
    dot: vars.accentAlt,
    text: vars.accentAlt
  },
} as const;

for (const [status, { dot, text }] of Object.entries(STATUS_COLOURS)) {
  const card = `.presence-card[data-status="${status}"]`;
  globalStyle(`${card} .pc-status`, { background: dot });
  globalStyle(`${card} .pc-status-text`, { color: text });
  globalStyle(`${card} .pc-status-text::before`, { background: dot });
}

globalStyle(".pc-id", {
  display: "flex",
  flexDirection: "column",
  gap: "0.05rem",
  minWidth: 0,
});

globalStyle(".pc-name", {
  fontSize: "0.92rem",
  fontWeight: 700,
  color: vars.accent,
  ...ELLIPSIS,
  transition: "color 0.5s ease",
});

globalStyle(".pc-user", {
  fontSize: "0.7rem",
  color: vars.textMuted,
  whiteSpace: "nowrap",
});

globalStyle(".pc-user:empty", { display: "none" });

globalStyle(".pc-status-text", {
  fontSize: "0.7rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  color: vars.textDim,
});

globalStyle(".pc-status-text:empty", { display: "none" });

globalStyle(".pc-status-text::before", {
  content: '""',
  display: "inline-block",
  width: 7,
  height: 7,
  borderRadius: 0,
  marginRight: "0.3rem",
  verticalAlign: "baseline",
  background: vars.textFaint,
});

globalStyle(".pc-sections", {
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  padding: "0 0.6rem 0.6rem",
  transition: "opacity 0.2s ease",
});

globalStyle(".presence-card:not(.has-sections) .pc-sections", { display: "none" });

globalStyle(".pc-row", {
  display: "flex",
  alignItems: "center",
  gap: "0.55rem",
  padding: "0.4rem 0.5rem",
  borderRadius: 0,
  background: vars.bgRaised,
  border: "1px solid transparent",
  color: vars.text,
  textDecoration: "none",
  transition: "border-color 0.15s ease, transform 0.15s ease",
});

globalStyle("a.pc-row:hover, .pc-row--stack:hover", {
  borderColor: "rgba(var(--dc-accent), 0.55)",
  transform: "translateX(2px)",
});

globalStyle(".pc-row-text", {
  display: "flex",
  flexDirection: "column",
  gap: "0.04rem",
  minWidth: 0,
});

globalStyle(".pc-row-kind", {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.3rem",
  fontSize: "0.6rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: vars.textMuted,
});

globalStyle(".pc-brand-logo", {
  width: 12,
  height: 12,
  borderRadius: 0,
  objectFit: "contain",
  flexShrink: 0,
});

globalStyle(".pc-brand-spotify", {
  color: "#1DB954",
  borderRadius: 0,
});

globalStyle(".pc-row-title", {
  fontSize: "0.8rem",
  fontWeight: 500,
  ...ELLIPSIS,
  maxWidth: 200,
});

globalStyle(".pc-row-sub", {
  fontSize: "0.7rem",
  color: vars.textMuted,
  ...ELLIPSIS,
  maxWidth: 200,
});

globalStyle(".pc-row-title:empty, .pc-row-sub:empty", { display: "none" });

globalStyle(".pc-row-elapsed", {
  fontSize: "0.62rem",
  color: vars.textMuted,
  marginTop: "0.1rem",
});

globalStyle(".pc-row-elapsed:empty", { display: "none" });

globalStyle(".pc-art, .pc-row-ic-img", {
  width: 38,
  height: 38,
  borderRadius: 0,
  objectFit: "cover",
  flexShrink: 0,
});

globalStyle(".pc-stream-thumb", {
  width: 56,
  height: 38,
  borderRadius: 0,
  objectFit: "cover",
  flexShrink: 0,
  border: `1.5px solid ${vars.accentAlt}`,
});

globalStyle(".pc-row-ic.pc-dot", {
  width: 9,
  height: 9,
  borderRadius: 0,
  flexShrink: 0,
  margin: "0 0.5rem",
  background: vars.accent,
});

globalStyle(".pc-dev .pc-row-ic.pc-dot", {
  background: vars.info,
  borderRadius: 0
});
globalStyle(".pc-game .pc-row-ic.pc-dot", { background: vars.success });
globalStyle(".pc-stream .pc-row-ic.pc-dot", { background: vars.accentAlt });

globalStyle(".pc-custom", {
  position: "relative",
  alignSelf: "flex-start",
  background: vars.surfaceHi,
  border: "none",
  padding: "0.5rem 0.7rem",
  gap: "0.4rem",
  alignItems: "flex-start",
  borderRadius: 0,
  borderTopLeftRadius: 4,
  marginTop: "0.3rem",
});

globalStyle(".pc-custom::before, .pc-custom::after", {
  content: '""',
  position: "absolute",
  background: vars.surfaceHi,
  borderRadius: 0,
  pointerEvents: "none",
});

globalStyle(".pc-custom::before", {
  width: 9,
  height: 9,
  top: -5,
  left: 12
});
globalStyle(".pc-custom::after", {
  width: 5,
  height: 5,
  top: -11,
  left: 9
});

globalStyle(".pc-custom:hover", {
  transform: "none",
  borderColor: "transparent"
});

globalStyle(".pc-emoji", {
  width: 18,
  height: 18,
  flexShrink: 0,
  marginTop: "0.05rem",
});

globalStyle(".pc-custom-text", {
  fontSize: "0.74rem",
  color: vars.textMuted,
  maxWidth: 230,
  whiteSpace: "normal",
  overflowWrap: "anywhere",
  lineHeight: 1.35,
});

globalStyle(".pc-spotify .pc-row-title", { color: vars.success });

globalStyle(".pc-progress", {
  display: "flex",
  flexDirection: "column",
  gap: "0.15rem",
  marginTop: "0.25rem",
  width: 180,
});

globalStyle(".pc-bar", {
  height: 4,
  borderRadius: 0,
  background: vars.surfaceHi,
  overflow: "hidden",
});

globalStyle(".pc-fill", {
  display: "block",
  height: "100%",
  width: 0,
  borderRadius: 0,
  background: "rgb(var(--dc-accent))",
});

globalStyle(".pc-times", {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.58rem",
  color: vars.textMuted,
  fontVariantNumeric: "tabular-nums",
});

globalStyle(".presence-card", {
  "@media": {
    "(max-width: 640px)": { maxWidth: "calc(100vw - 2rem)" },
  },
});

globalStyle(".pc-name-row", {
  display: "flex",
  alignItems: "center",
  gap: "0.35rem",
  minWidth: 0,
});

globalStyle(".pc-name-row .pc-name", { minWidth: 0 });

globalStyle(".pc-name.is-gradient", {
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
});

globalStyle(".pc-tag", {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.2rem",
  flexShrink: 0,
  padding: "0.05rem 0.35rem",
  borderRadius: 0,
  background: vars.surfaceHigher,
  fontSize: "0.58rem",
  fontWeight: 700,
  letterSpacing: "0.03em",
  color: vars.text,
});

globalStyle(".pc-tag[hidden]", { display: "none" });

globalStyle(".pc-tag-badge", {
  width: 14,
  height: 14,
  display: "block"
});

globalStyle(".pc-sub-row", {
  display: "flex",
  alignItems: "center",
  gap: "0.35rem",
});

globalStyle("svg.pc-ic", {
  verticalAlign: "-0.125em",
  flex: "none",
});

globalStyle(".pc-platforms", {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.2rem",
  color: vars.textMuted,
});

globalStyle(".pc-plat", {
  display: "inline-flex",
  alignItems: "center",
  fontSize: 12,
  lineHeight: 1,
});

globalStyle(".pc-meta", {
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  marginTop: "0.1rem",
  fontSize: "0.66rem",
  color: vars.textMuted,
});

globalStyle(".pc-meta[hidden]", { display: "none" });

globalStyle(".pc-pin", {
  fontSize: "0.7rem",
  lineHeight: 1
});

globalStyle(".pc-row--stack", {
  flexDirection: "column",
  alignItems: "stretch",
  gap: "0.4rem",
});

globalStyle(".pc-row-link", {
  display: "flex",
  alignItems: "center",
  gap: "0.55rem",
  minWidth: 0,
  color: vars.text,
  textDecoration: "none",
});

globalStyle(".pc-ic-wrap", {
  position: "relative",
  flexShrink: 0,
  width: 38,
  height: 38,
});

globalStyle(".pc-ic-wrap .pc-row-ic-img", {
  width: 38,
  height: 38
});

globalStyle(".pc-ic-badge", {
  position: "absolute",
  right: -3,
  bottom: -3,
  width: 16,
  height: 16,
  borderRadius: 0,
  border: `2px solid ${vars.bgRaised}`,
  objectFit: "cover",
});

globalStyle(".pc-buttons", {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.35rem",
});

globalStyle(".pc-btn", {
  fontSize: "0.66rem",
  padding: "0.22rem 0.55rem",
  borderRadius: 0,
  background: vars.surfaceHi,
  color: vars.text,
  textDecoration: "none",
  border: "1px solid transparent",
  transition: "border-color 0.15s ease, background 0.15s ease",
});

globalStyle(".pc-btn:hover", {
  borderColor: "rgb(var(--dc-accent))",
  background: vars.surfaceHigher,
});

globalStyle(".pc-badges", {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.2rem",
  flexWrap: "wrap",
  marginTop: "0.15rem",
});

globalStyle(".pc-badges:empty", { display: "none" });

globalStyle(".pc-badge", {
  width: 16,
  height: 16,
  display: "block"
});

globalStyle(".pc-badge-link", {
  display: "inline-flex",
  lineHeight: 0
});

globalStyle(".pc-star", {
  marginLeft: "auto",
  alignSelf: "flex-start",
  background: "none",
  border: "none",
  cursor: 'url("https://m.doughmination.gay/img/cursor/pointer_0.png"), pointer',
  fontSize: "0.95rem",
  lineHeight: 1,
  color: vars.textMuted,
  padding: "0.1rem 0.15rem",
  transition: "color 0.15s ease, transform 0.15s ease",
});

globalStyle(".pc-star:hover", {
  color: vars.accent,
  transform: "scale(1.12)"
});

globalStyle(".pc-star.on", { color: vars.warning });

globalStyle(".pc-wishlist", { display: "none" });

globalStyle(".presence-card.show-wishlist .pc-wishlist", {
  display: "block",
  borderTop: `1px solid ${vars.surfaceHi}`,
  margin: "0 0.6rem",
  padding: "0.6rem 0 0.7rem",
});

globalStyle(".pc-wishlist-title", {
  fontSize: "0.62rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: vars.textMuted,
  marginBottom: "0.45rem",
});

globalStyle(".pc-wl-item", {
  display: "flex",
  alignItems: "center",
  gap: "0.45rem",
  padding: "0.25rem 0.4rem",
  borderRadius: 0,
  textDecoration: "none",
  color: vars.text,
});

globalStyle("a.pc-wl-item:hover", { background: vars.bgRaised });

globalStyle(".pc-wl-ic", {
  width: 22,
  height: 22,
  borderRadius: 0,
  objectFit: "cover",
});

globalStyle(".pc-wl-text", {
  display: "flex",
  flexDirection: "column",
  lineHeight: 1.2,
  minWidth: 0,
});

globalStyle(".pc-wl-name", { fontSize: "0.8rem" });

globalStyle(".pc-wl-type", {
  fontSize: "0.6rem",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: vars.textMuted,
});

globalStyle(".pc-wl-price", {
  marginLeft: "auto",
  paddingLeft: "0.5rem",
  fontSize: "0.72rem",
  color: vars.textSoft,
  whiteSpace: "nowrap",
});

globalStyle(".pc-wl-item.is-owned", { opacity: 0.5 });

globalStyle(".pc-wl-empty", {
  fontSize: "0.78rem",
  color: vars.textMuted,
  margin: 0,
});

globalStyle(".presence-card.has-profile-grad", {
  background:
    "linear-gradient(180deg, rgb(var(--pc-grad-1-rgb)) 0%, rgb(var(--pc-grad-2-rgb)) 100%)",
});

globalStyle(".presence-card.has-profile-grad:not(.has-accent)", {
  borderColor: "rgba(var(--pc-grad-1-rgb), 0.6)",
});

globalStyle(".presence-card.has-profile-grad .pc-row", {
  background: "rgba(17, 17, 27, 0.55)",
});

globalStyle(".pc-banner", {
  display: "block",
  width: "100%",
  height: 96,
  objectFit: "cover",
  margin: 0,
});

globalStyle(".pc-banner[hidden]", { display: "none" });

globalStyle(".presence-card.has-banner-color::before", {
  content: '""',
  display: "block",
  height: 64,
  background: "var(--pc-banner-color, var(--surface-hi))",
});

globalStyle(
  ".presence-card.has-banner .pc-head, .presence-card.has-banner-color .pc-head",
  { paddingTop: "0.7rem" },
);

globalStyle(
  ".presence-card.has-banner .pc-avatar, .presence-card.has-banner-color .pc-avatar",
  {
    width: 56,
    height: 56,
    alignSelf: "flex-start",
    transform: "translateY(-26px)",
    marginBottom: -26,
  },
);

globalStyle(
  ".presence-card.has-banner .pc-av-img, .presence-card.has-banner-color .pc-av-img",
  {
    width: 56,
    height: 56,
    border: `3px solid ${vars.surface}`
  },
);

globalStyle(
  ".presence-card.has-banner .pc-av-deco, .presence-card.has-banner-color .pc-av-deco",
  {
    width: 72,
    height: 72
  },
);

globalStyle(".pc-bio", {
  margin: "0 0.7rem 0.5rem",
  padding: "0.5rem 0.6rem",
  borderRadius: 0,
  background: vars.bgRaised,
  fontSize: "0.74rem",
  lineHeight: 1.25,
  color: vars.textSoft,
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
});

globalStyle(".pc-bio[hidden]", { display: "none" });

globalStyle(".pc-bio-emoji", {
  width: "1.2em",
  height: "1.2em",
  verticalAlign: "-0.22em",
  objectFit: "contain",
  margin: 0,
});

globalStyle(".pc-bio-link", {
  color: vars.info,
  textDecoration: "none",
  overflowWrap: "anywhere",
});

globalStyle(".pc-bio-link:hover", { textDecoration: "underline" });

globalStyle(".pc-connections", {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.35rem",
  margin: "0 0.7rem 0.6rem",
});

globalStyle(".pc-connections[hidden]", { display: "none" });

globalStyle(".pc-conn", {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.3rem",
  padding: "0.2rem 0.5rem",
  borderRadius: 0,
  background: vars.surfaceHi,
  border: "1px solid transparent",
  color: vars.text,
  fontSize: "0.66rem",
  textDecoration: "none",
  transition: "border-color 0.15s ease, background 0.15s ease",
});

globalStyle("a.pc-conn:hover", {
  borderColor: vars.accent,
  background: vars.surfaceHigher,
});

globalStyle(".pc-conn-check", {
  color: vars.success,
  fontWeight: 700
});

globalStyle(".pc-conn-ic", {
  width: 14,
  height: 14,
  display: "block",
  flex: "none",
});

globalStyle("svg.pc-conn-ic", {
  width: 14,
  height: 14,
  fontSize: 14,
  lineHeight: 1,
  color: "currentColor",
});

const CHIP = {
  padding: "0.05rem 0.4rem",
  borderRadius: 0,
  background: vars.surfaceHigher,
  fontSize: "0.6rem",
  fontWeight: 600,
  color: vars.textSoft,
  whiteSpace: "nowrap",
} as const;

globalStyle(".pc-pronouns", CHIP);
globalStyle(".pc-pronouns[hidden]", { display: "none" });

globalStyle(".pc-timezone", {
  ...CHIP,
  fontVariantNumeric: "tabular-nums",
  cursor: "default",
});

globalStyle(".pc-timezone[hidden]", { display: "none" });

globalStyle(".pc-premium", {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
});

globalStyle(".pc-premium[hidden]", { display: "none" });

globalStyle(".pc-nitro", {
  padding: "0.05rem 0.4rem",
  borderRadius: 0,
  background: `color-mix(in srgb, #b57edc 22%, ${vars.surfaceHigher})`,
  fontSize: "0.6rem",
  fontWeight: 600,
  color: `color-mix(in srgb, #c084fc 70%, ${vars.textSoft})`,
  whiteSpace: "nowrap",
  cursor: "default",
});

globalStyle(".pc-boost", {
  fontSize: "0.62rem",
  lineHeight: 1,
  cursor: "default"
});

globalStyle(".presence-card.is-mini .pc-conn-ic", {
  width: 13,
  height: 13
});

globalStyle(".presence-card.is-mini svg.pc-conn-ic", {
  width: 13,
  height: 13,
  fontSize: 13,
});

globalStyle(".pc-bio strong", {
  fontWeight: 700,
  color: vars.text
});
globalStyle(".pc-bio em", { fontStyle: "italic" });
globalStyle(".pc-bio u", { textDecoration: "underline" });
globalStyle(".pc-bio s", {
  textDecoration: "line-through",
  color: vars.textDim
});

globalStyle(".pc-bio code", {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: "0.88em",
  background: vars.bgDeep,
  padding: "0.05em 0.28em",
  borderRadius: 0,
});

globalStyle(".pc-bio pre", {
  margin: "0.25rem 0",
  padding: "0.35rem 0.45rem",
  background: vars.bgDeep,
  borderRadius: 0,
  overflowX: "auto",
});
globalStyle(".pc-bio pre code", {
  background: "none",
  padding: 0,
  fontSize: "0.85em"
});

globalStyle(".pc-bio blockquote", {
  margin: "0.1rem 0",
  paddingLeft: "0.45rem",
  borderLeft: `2px solid ${vars.surfaceHigher}`,
  color: vars.textMuted,
});

globalStyle(".pc-bio h1, .pc-bio h2, .pc-bio h3", {
  margin: "0.2rem 0 0.1rem",
  fontWeight: 700,
  color: vars.text,
  fontSize: "1.05em",
  lineHeight: 1.2,
});

globalStyle(".pc-bio small", {
  fontSize: "0.85em",
  color: vars.textDim
});
globalStyle(".pc-bio li", {
  display: "list-item",
  marginLeft: "0.9rem"
});

globalStyle(".pc-spoiler", {
  background: vars.surfaceHigher,
  borderRadius: 0,
  cursor: "pointer",
  color: "transparent",
  transition: "color 0.12s ease, background 0.12s ease",
});
globalStyle('.pc-spoiler[data-revealed="true"]', {
  background: vars.bgDeep,
  color: "inherit",
  cursor: "auto",
});
globalStyle('.pc-spoiler[data-revealed="false"] *', { visibility: "hidden" });
