/* personal/src/scripts/devInfo.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useLanguage } from "@/i18n/languageProvider";
import type { Dictionary } from "@/i18n/locales/en";

/** Ordered month labels (Jan…Dec) for the given locale. */
function monthLabels(d: Dictionary): string[] {
  const m = d.devInfo.months;
  return [m.jan, m.feb, m.mar, m.apr, m.may, m.jun, m.jul, m.aug, m.sep, m.oct, m.nov, m.dec];
}

/* Ported from heatmap.js — the contribution heatmap. */

/* ======================================================================
 * Contribution heatmap
 * ==================================================================== */

type HeatDay = { sources: Record<string, number>; contributions: number; date: string };
type Week = HeatDay[];

function sundayOf(date: Date | number): Date {
  const sunday = new Date(date);
  sunday.setUTCDate(sunday.getUTCDate() - sunday.getUTCDay());
  sunday.setUTCHours(0, 0, 0, 0);
  return sunday;
}
function level(n: number): number {
  if (n === 0) return 0;
  if (n < 3) return 1;
  if (n < 6) return 2;
  if (n < 10) return 3;
  return 4;
}
function emptyWeekFrom(sunday: Date): Week {
  let dayCount = 7;
  const thisSunday = sundayOf(new Date());
  if (thisSunday.getTime() === sunday.getTime()) dayCount = new Date().getUTCDay() + 1;
  const week: Week = [];
  for (let i = 0; i < dayCount; i++) {
    const d = new Date(sunday);
    d.setUTCDate(d.getUTCDate() + i);
    week.push({
      sources: {},
      contributions: 0,
      date: d.toISOString().slice(0, 10)
    });
  }
  return week;
}
type Source = { timestamp: number; contributions: number };
function buildHeatmapData(sources: Record<string, Source[]>): Week[] {
  const weeks = new Map<number, Week>();
  for (const sourceName of Object.keys(sources)) {
    const source = (sources[sourceName] || []).slice().sort((a, b) => a.timestamp - b.timestamp);
    for (const day of source) {
      const sunday = sundayOf(day.timestamp * 1000);
      const key = Math.floor(sunday.getTime() / 1000);
      if (!weeks.has(key)) weeks.set(key, emptyWeekFrom(sunday));
      if (day.contributions > 0) {
        const week = weeks.get(key)!;
        const idx = new Date(day.timestamp * 1000).getUTCDay();
        week[idx].contributions += day.contributions;
        week[idx].sources[sourceName] = (week[idx].sources[sourceName] || 0) + day.contributions;
      }
    }
  }
  return [...weeks.entries()].sort(([a], [b]) => a - b).map(([, w]) => w);
}

const NEUTRAL = "#20262e";
const THEMES: Record<string, string[]> = {
  forest: ["#232a33", "#173f2c", "#1e7349", "#34ab68", "#5ce897"],
  rainbow: [NEUTRAL, "#e40303", "#ff8c00", "#ffed00", "#2ecc40"],
  trans: [NEUTRAL, "#5bcefa", "#f5a9b8", "#fbd3dc", "#ffffff"],
};
function resolveTheme(theme: string): string[] {
  return THEMES[theme] || THEMES.rainbow;
}

function Heatmap({
  theme = "trans",
  url = "https://doughmination.uk/v2/contribapi",
}: {
  theme?: string;
  url?: string;
}) {
  const { t, dict } = useLanguage();
  const MONTHS = monthLabels(dict);
  const [state, setState] = useState<
    { weeks: Week[]; total: number; since: string | null } | "loading" | "error"
  >("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((r) => r.json())
      .then((payload) => {
        const data =
          payload && Object.prototype.hasOwnProperty.call(payload, "success")
            ? payload.data || {}
            : payload;
        const weeks = buildHeatmapData(data);
        let total = 0;
        weeks.forEach((w) => w.forEach((d) => (total += d.contributions)));
        const since = weeks.length ? weeks[0][0].date : null;
        setState({
          weeks,
          total,
          since
        });
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setState("error");
      });
    return () => controller.abort();
  }, [url]);

  const palette = resolveTheme(theme);
  const rootStyle: CSSProperties & Record<string, string> = {} as CSSProperties &
    Record<string, string>;
  palette.forEach((c, i) => {
    if (c) rootStyle[`--contrib-${i}`] = c;
  });

  const monthOf = (week: Week) => new Date(week[0].date + "T00:00:00Z").getUTCMonth();

  return (
    <div className="ch-root" style={rootStyle}>
      <p className="ch-count">
        {state === "loading"
          ? t("devInfo.loading")
          : state === "error"
            ? t("devInfo.contribError")
            : t("devInfo.contribCount")
                .replace("{n}", String(state.total))
                .replace("{date}", String(state.since))}
      </p>

      {state !== "loading" && state !== "error" ? (
        <div className="ch-scroll">
          <div className="ch-months">
            {state.weeks.map((week, w) => {
              const m = monthOf(week);
              const prevM = w > 0 ? monthOf(state.weeks[w - 1]) : -1;
              return <span key={w}>{m !== prevM ? MONTHS[m] : ""}</span>;
            })}
          </div>
          <div className="ch-body">
            <div className="ch-weekdays">
              {["", dict.devInfo.weekday.mon, "", dict.devInfo.weekday.wed, "", dict.devInfo.weekday.fri, ""].map(
                (label, i) => (
                  <span key={i}>{label}</span>
                ),
              )}
            </div>
            <div className="ch-grid">
              {state.weeks.map((week, w) =>
                week.map((day, di) => {
                  const breakdown = Object.entries(day.sources)
                    .map(([n, v]) => `${n}: ${v}`)
                    .join(", ");
                  return (
                    <div
                      key={`${w}-${di}`}
                      className={`ch-day l${level(day.contributions)}`}
                      title={
                        t("devInfo.contribDay")
                          .replace("{n}", String(day.contributions))
                          .replace("{date}", day.date) +
                        (breakdown ? ` (${breakdown})` : "")
                      }
                      style={{ animationDelay: `${w * 8}ms` }}
                    />
                  );
                }),
              )}
            </div>
          </div>
        </div>
      ) : null}

      <div className="ch-legend">
        <span>{t("devInfo.less")}</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`ch-day l${i}`} />
        ))}
        <span>{t("devInfo.more")}</span>
      </div>
    </div>
  );
}

export default function DevInfo() {
  return (
    <div id="contrib">
      <Heatmap theme="trans" />
    </div>
  );
}
