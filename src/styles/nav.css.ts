/* personal/src/styles/nav.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes.css";

globalStyle(".nav", {
  position: "fixed",
  left: "1rem",
  top: "1rem",
  zIndex: 6,
  transition: "opacity 0.6s ease, transform 0.6s ease",
});

globalStyle(".nav-links", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.4rem",
});

globalStyle(".nav-link", {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.45rem",
  padding: "0.3rem 0.7rem",
  borderRadius: 0,
  background: vars.surface,
  border: `1px solid ${vars.surfaceHi}`,
  color: vars.textSoft,
  fontSize: "0.8rem",
  textDecoration: "none",
  transition:
    "transform 0.15s ease, border-color 0.15s ease, background 0.15s ease, color 0.15s ease",
});

globalStyle(".nav-link:hover", {
  borderColor: vars.accent,
  color: vars.text,
  transform: "translateX(2px)",
});

globalStyle(".nav-link.selected", {
  background: vars.accent,
  borderColor: vars.accent,
  color: vars.bgDeep,
  fontWeight: 700,
  marginLeft: 14,
});

globalStyle(".nav-link.selected::before", {
  content: '""',
  position: "absolute",
  left: -14,
  top: "50%",
  transform: "translateY(-50%)",
  border: "6px solid transparent",
  borderLeftColor: vars.accent,
});

globalStyle(".nav-ico", {
  display: "none",
});

const DESKTOP = "(min-width: 641px)";

globalStyle(".nav-toggle", {
  position: "absolute",
  width: 1,
  height: 1,
  opacity: 0,
  margin: 0,
  pointerEvents: "none",
});

globalStyle(".nav-burger", {
  display: "none",
});

globalStyle(".nav-burger", {
  "@media": {
    [DESKTOP]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "4px",
      width: "2.5rem",
      height: "2.5rem",
      padding: "0 0.6rem",
      borderRadius: 0,
      background: vars.surface,
      border: `1px solid ${vars.surfaceHi}`,
      cursor: "pointer",
      transition: "border-color 0.15s ease, background 0.15s ease",
    },
  },
});

globalStyle(".nav-burger:hover", {
  "@media": {
    [DESKTOP]: {
      borderColor: vars.accent,
      background: vars.surfaceHi,
    },
  },
});

globalStyle(".nav-toggle:focus-visible ~ .nav-burger", {
  "@media": {
    [DESKTOP]: {
      borderColor: vars.accent,
      outline: `2px solid ${vars.accent}`,
      outlineOffset: 2,
    },
  },
});

globalStyle(".nav-burger span", {
  "@media": {
    [DESKTOP]: {
      display: "block",
      width: "100%",
      height: "2px",
      borderRadius: 0,
      background: vars.textSoft,
      transition: "transform 0.3s ease, opacity 0.2s ease",
    },
  },
});

globalStyle(".nav-toggle:checked ~ .nav-burger span:nth-child(1)", {
  "@media": { [DESKTOP]: { transform: "translateY(6px) rotate(45deg)" } },
});
globalStyle(".nav-toggle:checked ~ .nav-burger span:nth-child(2)", {
  "@media": { [DESKTOP]: { opacity: 0 } },
});
globalStyle(".nav-toggle:checked ~ .nav-burger span:nth-child(3)", {
  "@media": { [DESKTOP]: { transform: "translateY(-6px) rotate(-45deg)" } },
});

globalStyle(".nav-links", {
  "@media": {
    [DESKTOP]: {
      transform: "translateY(-6px)",
      marginTop: "0.5rem",
      pointerEvents: "none",
      transition: "transform 0.32s ease",
    },
  },
});

globalStyle(".nav-toggle:checked ~ .nav-links", {
  "@media": {
    [DESKTOP]: {
      transform: "translateY(0)",
      pointerEvents: "auto",
    },
  },
});

globalStyle(".nav-link.selected", {
  "@media": { [DESKTOP]: { marginLeft: 0 } },
});
globalStyle(".nav-link.selected::before", {
  "@media": { [DESKTOP]: { display: "none" } },
});

globalStyle(".nav-links .nav-link", {
  "@media": {
    [DESKTOP]: {
      width: "2.5rem",
      height: "2.5rem",
      padding: 0,
      justifyContent: "center",
      overflow: "hidden",
      opacity: 0,
      transform: "scale(0.4)",
      transitionProperty:
        "opacity, transform, width, padding, background, border-color, color",
      transitionDuration: "0.3s, 0.3s, 0.45s, 0.45s, 0.15s, 0.15s, 0.15s",
      transitionTimingFunction: "ease",
    },
  },
});

globalStyle(".nav-links .nav-link:hover", {
  "@media": { [DESKTOP]: { transform: "scale(1.06)" } },
});

globalStyle(".nav-ico", {
  "@media": {
    [DESKTOP]: {
      display: "flex",
      position: "absolute",
      inset: 0,
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.05rem",
      opacity: 1,
      pointerEvents: "none",
      transition: "opacity 0.3s ease",
    },
  },
});

globalStyle(".nav-label", {
  "@media": {
    [DESKTOP]: {
      opacity: 0,
      overflow: "hidden",
      whiteSpace: "nowrap",
      transition: "opacity 0.3s ease",
    },
  },
});

globalStyle(".nav-toggle:checked ~ .nav-links .nav-link", {
  "@media": {
    [DESKTOP]: {
      opacity: 1,
      transform: "scale(1)",
      width: "11rem",
      padding: "0 0.8rem",
    },
  },
});

globalStyle(".nav-toggle:checked ~ .nav-links .nav-ico", {
  "@media": { [DESKTOP]: { opacity: 0, transitionDelay: "0.95s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-label", {
  "@media": {
    [DESKTOP]: { opacity: 1, transitionDelay: "1s" },
  },
});

globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(1)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.05s, 0.05s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(2)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.10s, 0.10s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(3)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.15s, 0.15s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(4)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.20s, 0.20s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(5)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.25s, 0.25s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(6)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.30s, 0.30s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(7)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.35s, 0.35s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(8)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.40s, 0.40s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(9)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.45s, 0.45s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(10)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.50s, 0.50s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(11)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.55s, 0.55s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(12)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.60s, 0.60s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(13)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.65s, 0.65s, 1s, 1s, 0s, 0s, 0s" } },
});

globalStyle(".nav-links .nav-link:nth-child(1)", {
  "@media": { [DESKTOP]: { transitionDelay: "1s, 1s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(2)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.95s, 0.95s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(3)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.90s, 0.90s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(4)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.85s, 0.85s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(5)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.80s, 0.80s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(6)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.75s, 0.75s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(7)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.70s, 0.70s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(8)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.65s, 0.65s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(9)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.60s, 0.60s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(10)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.55s, 0.55s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(11)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.50s, 0.50s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(12)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.45s, 0.45s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(13)", {
  "@media": { [DESKTOP]: { transitionDelay: "0.40s, 0.40s, 0s, 0s, 0s, 0s, 0s" } },
});

globalStyle(".nav-label", {
  "@media": { [DESKTOP]: { transitionDelay: "0s" } },
});

globalStyle(
  ".nav-links, .nav-links .nav-link, .nav-ico, .nav-label, .nav-burger span",
  {
    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transition: "none",
      },
    },
  },
);
