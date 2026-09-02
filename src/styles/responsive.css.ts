/* personal/src/styles/responsive.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes.css";

const NARROW_OR_SHORT = "(max-width: 420px), (max-height: 640px)";

globalStyle(".hub-header", {
  "@media": {
    [NARROW_OR_SHORT]: { marginBottom: "1.25rem" },
    "(max-width: 640px)": { marginBottom: "1.5rem" },
  },
});

globalStyle(".hub-header h1", {
  "@media": { [NARROW_OR_SHORT]: { fontSize: "1.6rem" } },
});

globalStyle(".pfp", {
  "@media": {
    [NARROW_OR_SHORT]: {
      width: 72,
      height: 72,
      marginBottom: "0.5rem"
    },
  },
});

globalStyle(".cat-grid", {
  "@media": { "(max-width: 420px)": { gridTemplateColumns: "repeat(2, 1fr)" } },
});

const MOBILE = "(max-width: 640px)";

globalStyle("html", {
  "@media": {
    [MOBILE]: {
      height: "auto",
      overflowX: "hidden",
      overflowY: "auto",
    },
  },
});

globalStyle(
  "body, body:has(.dev-info), body:has(.project-grid), body:has(.friend-grid)",
  {
    "@media": {
      [MOBILE]: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1rem",
        height: "auto",
        minHeight: "100dvh",
        overflowX: "hidden",
        overflowY: "visible",
        padding: "1.25rem 1rem 2rem",
      },
    },
  },
);

globalStyle(
  ".hub, body:has(.dev-info) .hub, body:has(.project-grid) .hub, body:has(.friend-grid) .hub",
  {
    "@media": {
      [MOBILE]: {
        order: 2,
        width: "100%",
        maxWidth: "100%"
      }
    }
  },
);

globalStyle(".nav::before", {
  "@media": {
    [MOBILE]: {
      content: '""',
      position: "fixed",
      inset: 0,
      zIndex: 5,
      background: "rgba(0, 0, 0, 0.55)",
      opacity: 0,
      pointerEvents: "none",
      transition: "opacity 0.3s ease",
    },
  },
});

globalStyle(".nav:has(.nav-toggle:checked)::before", {
  "@media": {
    [MOBILE]: {
      opacity: 1,
      pointerEvents: "auto",
    },
  },
});

globalStyle(".nav-burger", {
  "@media": {
    [MOBILE]: {
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
      position: "relative",
      zIndex: 6,
      transition: "border-color 0.15s ease, background 0.15s ease",
    },
  },
});

globalStyle(".nav-burger:hover", {
  "@media": {
    [MOBILE]: {
      borderColor: vars.accent,
      background: vars.surfaceHi,
    },
  },
});

globalStyle(".nav-toggle:focus-visible ~ .nav-burger", {
  "@media": {
    [MOBILE]: {
      borderColor: vars.accent,
      outline: `2px solid ${vars.accent}`,
      outlineOffset: 2,
    },
  },
});

globalStyle(".nav-burger span", {
  "@media": {
    [MOBILE]: {
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
  "@media": { [MOBILE]: { transform: "translateY(6px) rotate(45deg)" } },
});
globalStyle(".nav-toggle:checked ~ .nav-burger span:nth-child(2)", {
  "@media": { [MOBILE]: { opacity: 0 } },
});
globalStyle(".nav-toggle:checked ~ .nav-burger span:nth-child(3)", {
  "@media": { [MOBILE]: { transform: "translateY(-6px) rotate(-45deg)" } },
});

globalStyle(".nav-links", {
  "@media": {
    [MOBILE]: {
      position: "fixed",
      top: "50%",
      left: "50%",
      zIndex: 6,
      flexDirection: "column",
      alignItems: "center",
      gap: "0.4rem",
      maxHeight: "80vh",
      overflowY: "auto",
      padding: "1rem 0",
      opacity: 0,
      transform: "translate(-50%, -50%) scale(0.95)",
      pointerEvents: "none",
      transition: "opacity 0.3s ease, transform 0.3s ease",
    },
  },
});

globalStyle(".nav-toggle:checked ~ .nav-links", {
  "@media": {
    [MOBILE]: {
      opacity: 1,
      transform: "translate(-50%, -50%) scale(1)",
      pointerEvents: "auto",
    },
  },
});

globalStyle(".nav-link.selected", {
  "@media": { [MOBILE]: { marginLeft: 0 } },
});

globalStyle(".nav-link.selected::before", {
  "@media": { [MOBILE]: { display: "none" } },
});

globalStyle(".nav-links .nav-link", {
  "@media": {
    [MOBILE]: {
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

globalStyle(".nav-ico", {
  "@media": {
    [MOBILE]: {
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
    [MOBILE]: {
      opacity: 0,
      overflow: "hidden",
      whiteSpace: "nowrap",
      transition: "opacity 0.3s ease",
    },
  },
});

globalStyle(".nav-toggle:checked ~ .nav-links .nav-link", {
  "@media": {
    [MOBILE]: {
      opacity: 1,
      transform: "scale(1)",
      width: "11rem",
      padding: "0 0.8rem",
    },
  },
});

globalStyle(".nav-toggle:checked ~ .nav-links .nav-ico", {
  "@media": { [MOBILE]: { opacity: 0, transitionDelay: "0.95s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-label", {
  "@media": { [MOBILE]: { opacity: 1, transitionDelay: "1s" } },
});

globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(1)", {
  "@media": { [MOBILE]: { transitionDelay: "0.05s, 0.05s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(2)", {
  "@media": { [MOBILE]: { transitionDelay: "0.10s, 0.10s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(3)", {
  "@media": { [MOBILE]: { transitionDelay: "0.15s, 0.15s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(4)", {
  "@media": { [MOBILE]: { transitionDelay: "0.20s, 0.20s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(5)", {
  "@media": { [MOBILE]: { transitionDelay: "0.25s, 0.25s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(6)", {
  "@media": { [MOBILE]: { transitionDelay: "0.30s, 0.30s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(7)", {
  "@media": { [MOBILE]: { transitionDelay: "0.35s, 0.35s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(8)", {
  "@media": { [MOBILE]: { transitionDelay: "0.40s, 0.40s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(9)", {
  "@media": { [MOBILE]: { transitionDelay: "0.45s, 0.45s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(10)", {
  "@media": { [MOBILE]: { transitionDelay: "0.50s, 0.50s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(11)", {
  "@media": { [MOBILE]: { transitionDelay: "0.55s, 0.55s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(12)", {
  "@media": { [MOBILE]: { transitionDelay: "0.60s, 0.60s, 1s, 1s, 0s, 0s, 0s" } },
});
globalStyle(".nav-toggle:checked ~ .nav-links .nav-link:nth-child(13)", {
  "@media": { [MOBILE]: { transitionDelay: "0.65s, 0.65s, 1s, 1s, 0s, 0s, 0s" } },
});

globalStyle(".nav-links .nav-link:nth-child(1)", {
  "@media": { [MOBILE]: { transitionDelay: "1s, 1s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(2)", {
  "@media": { [MOBILE]: { transitionDelay: "0.95s, 0.95s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(3)", {
  "@media": { [MOBILE]: { transitionDelay: "0.90s, 0.90s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(4)", {
  "@media": { [MOBILE]: { transitionDelay: "0.85s, 0.85s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(5)", {
  "@media": { [MOBILE]: { transitionDelay: "0.80s, 0.80s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(6)", {
  "@media": { [MOBILE]: { transitionDelay: "0.75s, 0.75s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(7)", {
  "@media": { [MOBILE]: { transitionDelay: "0.70s, 0.70s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(8)", {
  "@media": { [MOBILE]: { transitionDelay: "0.65s, 0.65s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(9)", {
  "@media": { [MOBILE]: { transitionDelay: "0.60s, 0.60s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(10)", {
  "@media": { [MOBILE]: { transitionDelay: "0.55s, 0.55s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(11)", {
  "@media": { [MOBILE]: { transitionDelay: "0.50s, 0.50s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(12)", {
  "@media": { [MOBILE]: { transitionDelay: "0.45s, 0.45s, 0s, 0s, 0s, 0s, 0s" } },
});
globalStyle(".nav-links .nav-link:nth-child(13)", {
  "@media": { [MOBILE]: { transitionDelay: "0.40s, 0.40s, 0s, 0s, 0s, 0s, 0s" } },
});

globalStyle(".nav-label", {
  "@media": { [MOBILE]: { transitionDelay: "0s" } },
});

globalStyle(
  ".nav-links, .nav-links .nav-link, .nav-ico, .nav-label, .nav-burger span, body::before",
  {
    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transition: "none",
      },
    },
  },
);

globalStyle("#visitor-counter", {
  "@media": {
    [MOBILE]: {
      position: "static",
      top: "auto",
      right: "auto",
      marginTop: "1rem",
    },
  },
});

globalStyle(".dev-info, .project-grid, .friend-grid", {
  "@media": { [MOBILE]: { paddingBottom: "1rem" } },
});

globalStyle(".section + .section", {
  "@media": { [MOBILE]: { marginTop: "1.5rem" } },
});

globalStyle(".project-grid", {
  "@media": { "(max-width: 380px)": { gridTemplateColumns: "1fr" } },
});

globalStyle(".project-card-img", {
  "@media": {
    "(max-width: 380px)": {
      width: 48,
      height: 48
    }
  },
});