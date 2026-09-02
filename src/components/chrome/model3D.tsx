/* personal/src/components/chrome/model3D.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

let mvPromise: Promise<void> | null = null;

function loadModelViewer(): Promise<void> {
  if (typeof window !== "undefined" && customElements.get("model-viewer")) {
    return Promise.resolve();
  }
  if (!mvPromise) {
    mvPromise = import("@google/model-viewer/dist/model-viewer.min.js")
      .then(() => undefined)
      .catch(() => {
        mvPromise = null;
      });
  }
  return mvPromise;
}

type Model3DProps = {
  src: string;
  poster?: string;
  alt?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  loading?: "lazy" | "eager";
  cameraOrbit?: string;
  className?: string;
  style?: CSSProperties;
};

export default function Model3D({
  src,
  poster,
  alt = "3D model",
  autoRotate = true,
  interactive = true,
  loading = "lazy",
  cameraOrbit,
  className,
  style,
}: Model3DProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    loadModelViewer();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("src", src);
    if (poster) el.setAttribute("poster", poster);
    el.setAttribute("alt", alt);
    el.setAttribute("loading", loading);
    el.setAttribute("reveal", "auto");
    el.setAttribute("shadow-intensity", "1");
    el.setAttribute("exposure", "1");
    if (autoRotate) el.setAttribute("auto-rotate", "");
    else el.removeAttribute("auto-rotate");
    if (interactive) el.setAttribute("camera-controls", "");
    else el.removeAttribute("camera-controls");
    if (cameraOrbit) {
      el.setAttribute("camera-orbit", cameraOrbit);
      el.setAttribute("min-camera-orbit", cameraOrbit);
      el.setAttribute("max-camera-orbit", cameraOrbit);
    }
  }, [src, poster, alt, autoRotate, interactive, loading, cameraOrbit]);

  const Tag = "model-viewer" as unknown as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "20rem",
        display: "block",
        "--poster-color": "transparent",
        ...style,
      }}
    />
  );
}
