/* personal/src/scripts/util.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

export function realText(v: unknown): string {
  if (v == null) return "";
  const s = String(v).trim();
  const l = s.toLowerCase();
  return l === "" || l === "null" || l === "undefined" ? "" : s;
}

export type RelTimeStrings = {
  justNow: string;
  minutesAgo: string;
  hoursAgo: string;
  daysAgo: string;
};

export function relTime(iso: string | undefined, strings: RelTimeStrings): string {
  const t = Date.parse(iso ?? "");
  if (!Number.isFinite(t)) return "";
  let s = Math.round((Date.now() - t) / 1000);
  if (s < 0) s = 0;
  if (s < 45) return strings.justNow;
  const m = Math.round(s / 60);
  if (m < 60) return strings.minutesAgo.replace("{n}", String(m));
  const h = Math.round(m / 60);
  if (h < 24) return strings.hoursAgo.replace("{n}", String(h));
  return strings.daysAgo.replace("{n}", String(Math.round(h / 24)));
}
