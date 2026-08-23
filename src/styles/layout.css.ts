/* personal/src/styles/layout.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

/**
 * layout.css.ts — the shared .hub / .pfp / .hub-header chrome at the top of
 * most pages.
 *
 * Ported from public/css/shared/layout.css. All six rules were live.
 *
 * globalStyle rather than style(): this markup is written by hand across many
 * page components (app/page.tsx, 88x31, selfies, dev-info, …) rather than owned
 * by a single one, so the class names must stay literal.
 */
import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes.css";

globalStyle(".hub", {
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: 460,
});

globalStyle(".pfp", {
  width: 96,
  height: 96,
  borderRadius: 0,
  objectFit: "cover",
  border: `2px solid ${vars.warning}`,
  boxShadow: `4px 4px 0 ${vars.warning}`,
  marginBottom: "0.75rem",
});

globalStyle(".hub-header", {
  textAlign: "center",
  marginBottom: "2.25rem",
});

/* The animated trans-flag gradient title was dropped in favour of a plain
   solid heading — matching the terminal/clunky redesign's move away from
   soft gradient-text effects (see the system project's home.css.ts). A
   proper flag-stripe accent (a small div above the h1) is a page-by-page
   JSX change, not a shared-file one — left for the per-page pass. */
globalStyle(".hub-header h1", {
  margin: 0,
  fontSize: "2rem",
  fontWeight: 700,
  letterSpacing: "-0.01em",
  textTransform: "uppercase",
  color: vars.text,
});

globalStyle(".tagline", {
  margin: "0.35rem 0 0",
  color: vars.textMuted,
  fontSize: "0.95rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
});

globalStyle(".pronouns", {
  margin: "0.35rem 0 0",
  color: vars.accentAlt,
  fontSize: "0.95rem",
  letterSpacing: "0.04em",
  textTransform: "lowercase",
});
