/* personal/eslint.config.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "next-env.d.ts",
      "**/*.css.ts.vanilla.css",
    ],
  },

  ...coreWebVitals,
  ...typescript,
];

export default config;
