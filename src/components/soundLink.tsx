/* personal/src/components/soundLink.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import type { AnchorHTMLAttributes } from "react";
import { playClickSound } from "@lib/sound";

export default function SoundLink({
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      onClick={(e) => {
        playClickSound();
        onClick?.(e);
      }}
    />
  );
}
