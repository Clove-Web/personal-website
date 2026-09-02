/* personal/src/styles/stage.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes.css";

globalStyle("html:has(.presence-stage), body:has(.presence-stage)", {
  height: "auto",
  minHeight: "100dvh",
  overflowY: "auto",
});

globalStyle("body:has(.presence-stage)", { padding: 0 });

globalStyle(".presence-stage", {
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "1.5rem",
  width: "100%",
  boxSizing: "border-box",
  "@media": {
    "(max-width: 480px)": {
      padding: 10,
      justifyContent: "flex-start"
    },
  },
});

globalStyle(".presence-intro", {
  textAlign: "center",
  margin: "0 0 1.25rem",
  "@media": { "(max-width: 480px)": { maxWidth: "100%" } },
});

globalStyle(".presence-intro h1", {
  margin: 0,
  fontSize: "1.8rem",
  color: vars.accent
});

globalStyle(".presence-intro p", {
  margin: "0.3rem 0 0",
  fontSize: "0.9rem",
  color: vars.textMuted,
});
