/* personal/src/styles/themes.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import {
  createGlobalTheme,
  createGlobalThemeContract,
  globalStyle,
} from "@vanilla-extract/css";

export const vars = createGlobalThemeContract({
  accent: "accent",
  accentAlt: "accent-alt",
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "info",
  rosewater: "rosewater",
  maroon: "maroon",
  peach: "peach",
  teal: "teal",
  sky: "sky",
  sapphire: "sapphire",
  lavender: "lavender",
  bgDeep: "bg-deep",
  bgRaised: "bg-raised",
  bg: "bg",
  surface: "surface",
  surfaceHi: "surface-hi",
  surfaceHigher: "surface-higher",
  textFaint: "text-faint",
  textDim: "text-dim",
  textMuted: "text-muted",
  textSoft: "text-soft",
  text: "text",
});

createGlobalTheme(":root", vars, {
  accent: "#c22a44",
  accentAlt: "#9c1f34",
  success: "#5f9e78",
  danger: "#ff4d5e",
  warning: "#d8b775",
  info: "#c22a44",
  rosewater: "#fff2f2",
  maroon: "#9c1f34",
  peach: "#e2836a",
  teal: "#9c848c",
  sky: "#c7b6ba",
  sapphire: "#9c1f34",
  lavender: "#c22a44",
  bgDeep: "#030207",
  bgRaised: "#100a10",
  bg: "#07050a",
  surface: "#1a1016",
  surfaceHi: "#241318",
  surfaceHigher: "#2e1a20",
  textFaint: "#6b4a53",
  textDim: "#82616a",
  textMuted: "#9c848c",
  textSoft: "#c7b6ba",
  text: "#ece3e6",
});
globalStyle(":root", { colorScheme: "dark" });
