/* personal/src/scripts/genshinGallery.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useGenshinRoster } from "@doughmination/react-api";
import Model3D from "@components/chrome/model3D";
import { useLanguage } from "@/i18n/languageProvider";

export type Character = {
  name: string;
  model: string;
  avatarId?: string;
  tier: "owned" | "want";
  level?: number;
  tracked?: boolean;
};

const ASCENSION_CAPS = [20, 40, 50, 60, 70, 80, 90] as const;
const MAX_LEVEL = 90;

function ascensionProgress(level: number) {
  const clamped = Math.min(Math.max(level, 1), MAX_LEVEL);
  if (clamped >= MAX_LEVEL) {
    return {
      cap: MAX_LEVEL,
      floor: ASCENSION_CAPS.at(-2)!,
      fill: 1,
      maxed: true,
    };
  }
  const cap = ASCENSION_CAPS.find((c) => c > clamped)!;
  const capIndex = ASCENSION_CAPS.indexOf(cap);
  const floor = capIndex === 0 ? 1 : ASCENSION_CAPS[capIndex - 1];
  return {
    cap,
    floor,
    fill: (clamped - floor) / (cap - floor),
    maxed: false,
  };
}

const TIER_ORDER: Record<Character["tier"], number> = { want: 0, owned: 1 };
function orderCharacters(characters: Character[]): Character[] {
  return [...characters].sort((a, b) => {
    if (TIER_ORDER[a.tier] !== TIER_ORDER[b.tier]) {
      return TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
    }
    if ((b.level ?? 0) !== (a.level ?? 0)) {
      return (b.level ?? 0) - (a.level ?? 0);
    }
    return a.name.localeCompare(b.name);
  });
}

export default function GenshinGallery({
  uid,
  characters,
}: {
  uid: string;
  characters: Character[];
}) {
  const { t } = useLanguage();
  const { data: roster } = useGenshinRoster(uid);

  const merged = characters.map((c): Character => {
    if (!c.avatarId || !roster) return c;
    const live = roster.characters.find((r) => r.id === c.avatarId);
    if (!live) return c;
    return {
      ...c,
      tier: live.owned ? "owned" : "want",
      level: live.owned ? live.level ?? undefined : undefined,
      tracked: live.owned ? live.tracked : undefined,
    };
  });
  const ordered = orderCharacters(merged);

  return (
    <>
      {roster?.stale ? (
        <p className="genshin-stale-note" role="note">
          {t("genshin.staleNote")}
        </p>
      ) : (
        roster?.partial && (
          <p className="genshin-partial-note" role="note">
            {t("genshin.partialNote")}
          </p>
        )
      )}

      <div className="genshin-grid">
        {ordered.map((c) => {
          const showLevel = c.tier === "owned" && typeof c.level === "number";
          const progress = showLevel ? ascensionProgress(c.level!) : null;
          const untracked = c.tier === "owned" && c.tracked === false;

          return (
            <article className="genshin-card" key={c.name}>
              <div className="genshin-viewer">
                {c.tier && (
                  <span
                    className={`genshin-tag ${c.tier}${untracked ? " untracked" : ""}`}
                    title={untracked ? t("genshin.untracked") : undefined}
                  >
                    {t(c.tier === "owned" ? "genshin.owned" : "genshin.want")}
                  </span>
                )}
                <Model3D
                  src={c.model}
                  poster="https://m.doughmination.gay/img/avatars/favicon.png"
                  alt={t("genshin.modelAlt").replace("{name}", c.name)}
                />
              </div>
              <div className="genshin-meta">
                <h2>{c.name}</h2>
                {progress && (
                  <div className="genshin-level">
                    <div className="genshin-level-row">
                      <span className="genshin-level-value">
                        {t("genshin.level").replace("{n}", String(c.level))}
                      </span>
                      <span className="genshin-level-cap">
                        {untracked
                          ? t("genshin.lastSeen")
                          : progress.maxed
                            ? t("genshin.max")
                            : t("genshin.toLevel").replace("{n}", String(progress.cap))}
                      </span>
                    </div>
                    <div
                      className={`genshin-level-track${progress.maxed ? " maxed" : ""}`}
                      role="progressbar"
                      aria-valuemin={progress.floor}
                      aria-valuemax={progress.cap}
                      aria-valuenow={c.level}
                      aria-label={t("genshin.progressLabel")
                        .replace("{name}", c.name)
                        .replace("{n}", String(progress.cap))}
                    >
                      <span
                        className="genshin-level-fill"
                        style={{ width: `${Math.round(progress.fill * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
