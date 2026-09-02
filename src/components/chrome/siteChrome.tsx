/* personal/src/components/chrome/siteChrome.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useEffect } from "react";
import { initCore } from "@scripts/core";

export default function SiteChrome() {
  useEffect(() => {
    initCore();
  }, []);
  return null;
}
