/* personal/src/styles/presenceDashboard.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { style, globalStyle, keyframes } from "@vanilla-extract/css";
import { vars } from "./themes.css";

const ELLIPSIS = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
} as const;

export const page = style({
  maxWidth: 1100,
  margin: "0 auto",
  padding: "1.5rem 1.25rem 3rem",
  boxSizing: "border-box",
  width: "100%",
  "@media": {
    "(max-width: 640px)": { padding: "0.75rem 0.75rem 2rem" },
  },
});

export const intro = style({
  textAlign: "center",
  margin: "0 0 1.25rem",
});

export const introTitle = style({
  margin: 0,
  fontSize: "1.8rem",
  color: vars.accent,
});

export const introSub = style({
  margin: "0.3rem 0 0",
  fontSize: "0.9rem",
  color: vars.textMuted,
});

export const masthead = style({
  position: "relative",
  borderRadius: 0,
  overflow: "hidden",
  background: vars.surface,
  border: `1px solid ${vars.surfaceHi}`,
  marginBottom: "1rem",
});

export const banner = style({
  display: "block",
  width: "100%",
  height: 200,
  objectFit: "cover",
  background: vars.bgRaised,
  "@media": {
    "(max-width: 640px)": { height: 120 },
  },
});

export const bannerFallback = style([
  banner,
  {
    background: `linear-gradient(135deg, ${vars.surfaceHigher}, ${vars.surfaceHi})`,
  },
]);

export const identity = style({
  display: "flex",
  alignItems: "flex-end",
  gap: "1rem",
  padding: "1.1rem 1.5rem 1.25rem",
  position: "relative",
  "@media": {
    "(max-width: 640px)": {
      padding: "0.85rem 1rem 1rem",
      gap: "0.7rem",
    },
  },
});

export const avatarWrap = style({
  position: "relative",
  width: 104,
  height: 104,
  flexShrink: 0,
  transform: "translateY(-44px)",
  marginBottom: -44,
  "@media": {
    "(max-width: 640px)": {
      width: 76,
      height: 76,
      transform: "translateY(-30px)",
      marginBottom: -30,
    },
  },
});

export const avatar = style({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover",
  display: "block",
  background: vars.bgDeep,
  border: `4px solid ${vars.surface}`,
  boxSizing: "border-box",
});

export const avatarDeco = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "135%",
  height: "135%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
});

export const statusPip = style({
  position: "absolute",
  right: 2,
  bottom: 2,
  width: 26,
  height: 26,
  borderRadius: 0,
  border: `4px solid ${vars.surface}`,
  background: vars.textFaint,
  boxSizing: "border-box",
  "@media": {
    "(max-width: 640px)": {
      width: 20,
      height: 20,
      borderWidth: 3
    }
  },
});

export const idBlock = style({
  minWidth: 0,
  flex: 1,
  paddingBottom: "0.35rem",
  position: "relative",
});

export const nameplate = style({
  position: "absolute",
  right: 0,
  bottom: 0,
  width: "min(420px, 45%)",
  height: 92,
  overflow: "hidden",
  zIndex: 0,
  pointerEvents: "none",
  maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 45%, #000 100%)",
  WebkitMaskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 45%, #000 100%)",
  "@media": {
    "(max-width: 640px)": {
      height: 62,
      width: "min(240px, 55%)"
    },
  },
});

export const nameplateMedia = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "right bottom",
  display: "block",
  opacity: 0.65,
});

export const aboveNameplate = style({
  position: "relative",
  zIndex: 1
});

export const nameRow = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  flexWrap: "wrap",
});

export const name = style({
  margin: 0,
  fontSize: "1.75rem",
  fontWeight: 700,
  color: vars.accent,
  lineHeight: 1.15,
  ...ELLIPSIS,
  maxWidth: "100%",
  "@media": { "(max-width: 640px)": { fontSize: "1.25rem" } },
});

export const nameGradient = style({
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
});

export const nameLink = style({
  cursor: "pointer",
  selectors: {
    "&:hover": { textDecoration: "underline" },
    "&:focus-visible": {
      outline: `2px solid ${vars.accent}`,
      outlineOffset: 3
    },
  },
});

export const guildTag = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.28rem",
  padding: "0.16rem 0.45rem",
  borderRadius: 0,
  background: vars.surfaceHigher,
  fontSize: "0.72rem",
  fontWeight: 700,
  color: vars.textSoft,
  flexShrink: 0,
});

export const guildTagBadge = style({
  width: 16,
  height: 16,
  display: "block"
});

export const subRow = style({
  display: "flex",
  alignItems: "center",
  gap: "0.55rem",
  flexWrap: "wrap",
  marginTop: "0.35rem",
  fontSize: "0.82rem",
  color: vars.textMuted,
});

export const handle = style({ color: vars.textMuted });

export const statusText = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.32rem",
  fontWeight: 600,
});

export const statusDot = style({
  width: 8,
  height: 8,
  borderRadius: 0,
  background: vars.textFaint,
  flexShrink: 0,
});

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.28rem",
  height: 24,
  padding: "0 0.5rem",
  borderRadius: 0,
  background: vars.bgRaised,
  border: `1px solid ${vars.surfaceHi}`,
  fontSize: "0.72rem",
  color: vars.textMuted,
  boxSizing: "border-box",
  lineHeight: 1,
});

globalStyle(`${chip} svg`, {
  width: 13,
  height: 13,
  flexShrink: 0,
});

export const platforms = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.3rem",
  color: vars.textMuted,
  fontSize: 14,
});

export const statusBody = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.85rem",
  color: vars.textSoft,
});

export const customEmoji = style({
  width: 18,
  height: 18,
  flexShrink: 0
});

export const customStatusText = style({
  ...ELLIPSIS,
  minWidth: 0
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "1rem",
  alignItems: "start",
  "@media": {
    "(max-width: 700px)": {
      gridTemplateColumns: "1fr",
      gap: "0.75rem"
    },
  },
});

export const panel = style({
  background: vars.surface,
  border: `1px solid ${vars.surfaceHi}`,
  borderRadius: 0,
  padding: "1rem 1.1rem 1.1rem",
  minWidth: 0,
});

export const panelWide = style([panel, { gridColumn: "1 / -1" }]);

export const panelTitle = style({
  margin: "0 0 0.75rem",
  fontSize: "0.68rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.09em",
  color: vars.textDim,
});

export const npTitle_brand = style([
  panelTitle,
  {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
]);

export const brandLogo = style({
  width: 14,
  height: 14,
  borderRadius: 0,
  objectFit: "contain",
  flexShrink: 0,
});

export const brandSpotify = style({
  color: "#1DB954",
  borderRadius: 0,
});

export const panelToggle = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "100%",
  margin: "0 0 0.75rem",
  padding: 0,
  background: "none",
  border: "none",
  font: "inherit",
  fontSize: "0.68rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.09em",
  color: vars.textDim,
  cursor: "pointer",
  textAlign: "left",
  transition: "color 0.15s ease",
  selectors: {
    "&:hover": { color: vars.textMuted },
    "&:focus-visible": {
      outline: `2px solid ${vars.accent}`,
      outlineOffset: 3,
      borderRadius: 0
    },
  },
});

export const panelToggleClosed = style({ marginBottom: 0 });

export const panelCount = style({
  fontVariantNumeric: "tabular-nums",
  color: vars.textFaint,
  fontWeight: 600,
});

export const chevron = style({
  marginLeft: "auto",
  flexShrink: 0,
  transition: "transform 0.18s ease",
  "@media": { "(prefers-reduced-motion: reduce)": { transition: "none" } },
});

export const chevronOpen = style({ transform: "rotate(90deg)" });

export const scrollArea = style({
  maxHeight: 320,
  overflowY: "auto",
  overscrollBehavior: "contain",
  paddingRight: "0.25rem",
  scrollbarWidth: "thin",
  scrollbarColor: `${vars.surfaceHigher} transparent`,
});

globalStyle(`${scrollArea}::-webkit-scrollbar`, { width: 8 });
globalStyle(`${scrollArea}::-webkit-scrollbar-track`, { background: "transparent" });
globalStyle(`${scrollArea}::-webkit-scrollbar-thumb`, {
  background: vars.surfaceHigher,
  borderRadius: 0,
});
globalStyle(`${scrollArea}::-webkit-scrollbar-thumb:hover`, { background: vars.textFaint });

export const npRow = style({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  color: "inherit",
  textDecoration: "none",
  borderRadius: 0,
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${vars.accent}`,
      outlineOffset: 4
    },
  },
  "@media": { "(max-width: 480px)": { gap: "0.7rem" } },
});

export const npArt = style({
  width: 88,
  height: 88,
  borderRadius: 0,
  objectFit: "cover",
  flexShrink: 0,
  boxShadow: "3px 3px 0 rgba(0,0,0,0.5)",
  "@media": {
    "(max-width: 480px)": {
      width: 62,
      height: 62
    }
  },
});

export const npBody = style({
  minWidth: 0,
  flex: 1
});

export const npTitle = style({
  fontSize: "1.05rem",
  fontWeight: 700,
  color: vars.text,
  ...ELLIPSIS,
  "@media": { "(max-width: 480px)": { fontSize: "0.92rem" } },
});

export const npArtist = style({
  fontSize: "0.85rem",
  color: vars.textMuted,
  ...ELLIPSIS,
  marginTop: "0.1rem",
});

export const npAlbum = style({
  fontSize: "0.75rem",
  color: vars.textDim,
  ...ELLIPSIS,
  marginTop: "0.05rem",
});

export const npBar = style({
  position: "relative",
  height: 6,
  borderRadius: 0,
  background: vars.bgDeep,
  overflow: "hidden",
  marginTop: "0.7rem",
  width: "100%",
});

export const npFill = style({
  position: "absolute",
  insetBlock: 0,
  left: 0,
  borderRadius: 0,
  background: vars.accent,
  transition: "width 0.9s linear, background 0.6s ease",
});

export const npTimes = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.7rem",
  color: vars.textDim,
  marginTop: "0.3rem",
  fontVariantNumeric: "tabular-nums",
});

export const actList = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
});

export const actRow = style({
  display: "flex",
  gap: "0.75rem",
  alignItems: "center",
  padding: "0.55rem 0.6rem",
  borderRadius: 0,
  background: vars.bgRaised,
  border: "1px solid transparent",
  color: vars.text,
  textDecoration: "none",
  transition: "border-color 0.15s ease",
  selectors: {
    "a&:hover": { borderColor: vars.accent },
  },
});

export const actIcWrap = style({
  position: "relative",
  flexShrink: 0
});

export const actIc = style({
  width: 46,
  height: 46,
  borderRadius: 0,
  objectFit: "cover",
  display: "block",
  background: vars.bgDeep,
});

export const actIcBadge = style({
  position: "absolute",
  right: -4,
  bottom: -4,
  width: 20,
  height: 20,
  borderRadius: 0,
  border: `2px solid ${vars.bgRaised}`,
  boxSizing: "border-box",
});

export const actDot = style({
  width: 46,
  height: 46,
  borderRadius: 0,
  background: vars.surfaceHi,
  flexShrink: 0,
});

export const actBody = style({
  minWidth: 0,
  flex: 1
});

export const actKind = style({
  fontSize: "0.6rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: vars.textDim,
});

export const actTitle = style({
  fontSize: "0.88rem",
  fontWeight: 600,
  ...ELLIPSIS,
  marginTop: "0.05rem",
});

export const actSub = style({
  fontSize: "0.76rem",
  color: vars.textMuted,
  ...ELLIPSIS,
});

export const actElapsed = style({
  fontSize: "0.68rem",
  color: vars.textDim,
  marginTop: "0.15rem",
  fontVariantNumeric: "tabular-nums",
});

export const actButtons = style({
  display: "flex",
  gap: "0.35rem",
  flexWrap: "wrap",
  marginTop: "0.45rem",
});

export const actBtn = style({
  padding: "0.2rem 0.5rem",
  borderRadius: 0,
  background: vars.surfaceHi,
  fontSize: "0.7rem",
  color: vars.textSoft,
});

export const streamThumb = style({
  width: 74,
  height: 46,
  borderRadius: 0,
  objectFit: "cover",
  flexShrink: 0,
  border: `1.5px solid ${vars.accentAlt}`,
  boxSizing: "border-box",
});

export const badgeGrid = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.45rem",
});

export const badge = style({
  width: 30,
  height: 30,
  borderRadius: 0,
  objectFit: "contain",
  background: vars.bgRaised,
  padding: 3,
  boxSizing: "border-box",
});

export const badgeLink = style({
  display: "block",
  lineHeight: 0,
  borderRadius: 0,
  color: "inherit",
  textDecoration: "none",
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${vars.accent}`,
      outlineOffset: 2
    },
  },
});

export const connGrid = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.4rem",
});

export const conn = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.3rem 0.55rem",
  borderRadius: 0,
  background: vars.bgRaised,
  border: `1px solid ${vars.surfaceHi}`,
  fontSize: "0.78rem",
  color: vars.textSoft,
  textDecoration: "none",
  maxWidth: "100%",
  transition: "border-color 0.15s ease",
  selectors: {
    "a&:hover": { borderColor: vars.accent },
  },
});

export const connIcon = style({
  width: 15,
  height: 15,
  flexShrink: 0,
  display: "block"
});

export const connName = style({
  ...ELLIPSIS,
  minWidth: 0
});

export const connCheck = style({
  color: vars.success,
  display: "inline-flex",
  flexShrink: 0
});

export const bio = style({
  fontSize: "0.88rem",
  lineHeight: 1.6,
  color: vars.textSoft,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  margin: 0,
});

export const bioEmoji = style({
  width: "1.15em",
  height: "1.15em",
  verticalAlign: "-0.2em",
  display: "inline-block",
});

globalStyle(`${bio} a`, {
  color: vars.accent,
  textDecoration: "none",
});
globalStyle(`${bio} a:hover`, { textDecoration: "underline" });

globalStyle(`${bio} strong`, {
  fontWeight: 700,
  color: vars.text
});
globalStyle(`${bio} em`, { fontStyle: "italic" });
globalStyle(`${bio} u`, { textDecoration: "underline" });
globalStyle(`${bio} s`, {
  textDecoration: "line-through",
  color: vars.textDim
});

globalStyle(`${bio} code`, {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: "0.86em",
  background: vars.bgDeep,
  padding: "0.1em 0.35em",
  borderRadius: 0,
});

globalStyle(`${bio} pre`, {
  margin: "0.4rem 0",
  padding: "0.5rem 0.6rem",
  background: vars.bgDeep,
  borderRadius: 0,
  overflowX: "auto",
});
globalStyle(`${bio} pre code`, {
  background: "none",
  padding: 0,
  fontSize: "0.82em"
});

globalStyle(`${bio} blockquote`, {
  margin: "0.15rem 0",
  paddingLeft: "0.6rem",
  borderLeft: `3px solid ${vars.surfaceHigher}`,
  color: vars.textMuted,
});

globalStyle(`${bio} h1, ${bio} h2, ${bio} h3`, {
  margin: "0.3rem 0 0.15rem",
  fontWeight: 700,
  color: vars.text,
  lineHeight: 1.25,
});
globalStyle(`${bio} h1`, { fontSize: "1.15em" });
globalStyle(`${bio} h2`, { fontSize: "1.06em" });
globalStyle(`${bio} h3`, { fontSize: "1em" });

globalStyle(`${bio} small`, {
  fontSize: "0.82em",
  color: vars.textDim
});

globalStyle(`${bio} li`, {
  display: "list-item",
  marginLeft: "1.1rem"
});

export const spoiler = style({
  background: vars.surfaceHigher,
  borderRadius: 0,
  cursor: "pointer",
  color: "transparent",
  transition: "color 0.12s ease, background 0.12s ease",
  selectors: {
    '&[data-revealed="true"]': {
      background: vars.bgDeep,
      color: "inherit",
      cursor: "auto",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.accent}`,
      outlineOffset: 2
    },
  },
});

globalStyle(`${spoiler}[data-revealed="false"] *`, { visibility: "hidden" });

export const wlGrid = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
});

export const wlItem = style({
  display: "flex",
  alignItems: "center",
  gap: "0.55rem",
  padding: "0.4rem 0.5rem",
  borderRadius: 0,
  background: vars.bgRaised,
});

export const wlOwned = style({ opacity: 0.55 });

export const wlIc = style({
  width: 30,
  height: 30,
  borderRadius: 0,
  flexShrink: 0,
  objectFit: "cover"
});

export const wlBody = style({
  minWidth: 0,
  flex: 1
});

export const wlName = style({
  fontSize: "0.8rem",
  color: vars.textSoft,
  ...ELLIPSIS
});

export const wlType = style({
  fontSize: "0.66rem",
  color: vars.textDim
});

export const wlPrice = style({
  fontSize: "0.76rem",
  color: vars.accent,
  flexShrink: 0,
  fontVariantNumeric: "tabular-nums",
});

export const empty = style({
  margin: 0,
  padding: "0.3rem 0 0.1rem",
  fontSize: "0.82rem",
  fontStyle: "italic",
  color: vars.textDim,
});

const pulse = keyframes({
  "0%, 100%": { opacity: 0.45 },
  "50%": { opacity: 0.8 },
});

export const skeleton = style({
  animation: `${pulse} 1.6s ease-in-out infinite`,
  background: vars.surface,
  border: `1px solid ${vars.surfaceHi}`,
  borderRadius: 0,
  height: 300,
  "@media": { "(prefers-reduced-motion: reduce)": { animation: "none" } },
});
