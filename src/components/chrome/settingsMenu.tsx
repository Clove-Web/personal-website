/* personal/src/components/chrome/settingsMenu.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Gear,
  PlayFill,
  PauseFill,
  Translate,
  ChevronDown,
  VolumeDownFill,
  Cookie,
} from "react-bootstrap-icons";
import { playClickSound, playOpenSound, playCloseSound, playHoverSound } from "@lib/sound";
import { useLanguage } from "@/i18n/languageProvider";
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES } from "@/i18n/config";
import { openCookieSettings } from "@scripts/consent";
import { useMenus } from "./menusProvider";
import styles from "./settingsMenu.module.css";

declare global {
  interface Window {
    ctpBgm?: {
      toggle: () => void;
      isPaused: () => boolean;
      subscribe: (cb: (paused: boolean) => void) => () => void;
      getVolume: () => number;
      setVolume: (volume: number) => void;
      subscribeVolume: (cb: (volume: number) => void) => () => void;
    };
  }
}

export default function SettingsMenu() {
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(0.1);
  const [langPickerOpen, setLangPickerOpen] = useState(false);

  const { lang, setLang, t } = useLanguage();

  const { isOpen, toggle, close } = useMenus();
  const open = isOpen("settings");

  useEffect(() => {
    let unsubPaused: (() => void) | undefined;
    let unsubVolume: (() => void) | undefined;
    let tries = 0;
    const attach = () => {
      if (window.ctpBgm) {
        unsubPaused = window.ctpBgm.subscribe(setPaused);
        unsubVolume = window.ctpBgm.subscribeVolume(setVolume);
      } else if (tries++ < 50) {
        window.setTimeout(attach, 100);
      }
    };
    attach();
    return () => {
      unsubPaused?.();
      unsubVolume?.();
    };
  }, []);

  const onVolumeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value) / 100;
    setVolume(next);
    window.ctpBgm?.setVolume(next);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLangPickerOpen(false);
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) setLangPickerOpen(false);
  }, [open]);

  return (
    <div className={`${styles.bar}${open ? " " + styles.open : ""}`}>
      <button
        type="button"
        className={`${styles.btn} ${styles.toggle}`}
        aria-label={t("settings.title")}
        aria-haspopup="true"
        aria-expanded={open}
        title={t("settings.title")}
        onMouseEnter={playHoverSound}
        onClick={(e) => {
          e.stopPropagation();
          if (!open) playOpenSound();
          else playCloseSound();
          toggle("settings");
        }}
      >
        <Gear size={22} />
      </button>

      <div className={styles.items} aria-hidden={!open}>
        <div className={styles.dotRow}>
          <button
            type="button"
            className={styles.btn}
            aria-pressed={!paused}
            title={paused ? t("settings.playMusic") : t("settings.pauseMusic")}
            aria-label={paused ? t("settings.playMusic") : t("settings.pauseMusic")}
            tabIndex={open ? 0 : -1}
            onMouseEnter={playHoverSound}
            onClick={() => {
              playClickSound();
              window.ctpBgm?.toggle();
            }}
          >
            {paused ? <PlayFill size={22} /> : <PauseFill size={22} />}
          </button>

          <button
            type="button"
            className={styles.btn}
            title="Cookie preferences"
            aria-label="Cookie preferences"
            tabIndex={open ? 0 : -1}
            onMouseEnter={playHoverSound}
            onClick={() => {
              playClickSound();
              close();
              openCookieSettings();
            }}
          >
            <Cookie size={22} />
          </button>
        </div>

        <div className={styles.volumeRow}>
          <VolumeDownFill size={18} aria-hidden="true" className={styles.volumeIcon} />
          <input
            type="range"
            className={styles.volumeSlider}
            min={0}
            max={100}
            step={1}
            value={Math.round(volume * 100)}
            tabIndex={open ? 0 : -1}
            aria-label={t("settings.volume")}
            onMouseEnter={playHoverSound}
            onPointerDown={playClickSound}
            onChange={onVolumeInput}
          />
        </div>

        <button
          type="button"
          className={styles.langPill}
          aria-haspopup="true"
          aria-expanded={langPickerOpen}
          title={t("settings.language")}
          aria-label={t("settings.language")}
          tabIndex={open ? 0 : -1}
          onMouseEnter={playHoverSound}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setLangPickerOpen((o) => !o);
          }}
        >
          <Translate size={20} aria-hidden="true" />
          <span className={styles.langPillName}>{LANGUAGE_NAMES[lang]}</span>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`${styles.langChevron}${langPickerOpen ? " " + styles.langChevronOpen : ""}`}
          />
        </button>

        {open && langPickerOpen && (
          <div className={styles.langPicker} role="menu" aria-label={t("settings.language")}>
            {SUPPORTED_LANGUAGES.map((code) => {
              const active = code === lang;
              return (
                <button
                  key={code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  className={`${styles.langOption}${active ? " " + styles.langActive : ""}`}
                  onMouseEnter={playHoverSound}
                  onClick={() => {
                    playClickSound();
                    setLang(code);
                    setLangPickerOpen(false);
                  }}
                >
                  <span className={styles.langCode} aria-hidden="true">
                    {code}
                  </span>
                  <span className={styles.langName}>{LANGUAGE_NAMES[code]}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
