/* personal/src/scripts/core.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

/* eslint-disable */
// @ts-nocheck
import { icon } from "./presenceIcons";
import { randomAscii, randomAsciiColour } from "./asciis";
import { dictionaries } from "@/i18n/dictionaries";
import {
  DEFAULT_LANGUAGE,
  detectLanguage,
  isLanguage,
  localeFromPathname,
} from "@/i18n/config";

function currentDictionary() {
  try {
    const fromUrl = localeFromPathname(window.location.pathname);
    if (fromUrl) return dictionaries[fromUrl];

    const stored = window.localStorage.getItem("lang");
    return dictionaries[stored && isLanguage(stored) ? stored : detectLanguage()];
  } catch {
    return dictionaries[DEFAULT_LANGUAGE];
  }
}

export function initCore() {
  console.log(`%c${randomAscii()}`, `color: ${randomAsciiColour()}`);
  let ctpTracking = false;
  const ctpDocListeners = [];
  const ctpWinListeners = [];
  const ctpIntervals = [];
  const ctpTimeouts = [];
  const ctpFrames = [];

  (function ctpPatchGlobals() {
    function patchTarget(target, store) {
      const add = target.addEventListener.bind(target);
      target.addEventListener = function(type, listener, options) {
        if (ctpTracking) store.push([type, listener, options]);
        return add(type, listener, options);
      };
    }
    patchTarget(document, ctpDocListeners);
    patchTarget(window, ctpWinListeners);

    const _setInterval = window.setInterval.bind(window);
    const _setTimeout = window.setTimeout.bind(window);
    const _rAF = window.requestAnimationFrame.bind(window);
    window.setInterval = function(...args) {
      const id = _setInterval(...args);
      if (ctpTracking) ctpIntervals.push(id);
      return id;
    };
    window.setTimeout = function(...args) {
      const id = _setTimeout(...args);
      if (ctpTracking) ctpTimeouts.push(id);
      return id;
    };
    window.requestAnimationFrame = function(...args) {
      const id = _rAF(...args);
      if (ctpTracking) ctpFrames.push(id);
      return id;
    };
    window.__ctpRawRAF = _rAF;
  })();

  function ctpClearPageState() {
    while (ctpDocListeners.length) { const [t, l, o] = ctpDocListeners.pop(); document.removeEventListener(t, l, o); }
    while (ctpWinListeners.length) { const [t, l, o] = ctpWinListeners.pop(); window.removeEventListener(t, l, o); }
    while (ctpIntervals.length) clearInterval(ctpIntervals.pop());
    while (ctpTimeouts.length) clearTimeout(ctpTimeouts.pop());
    while (ctpFrames.length) cancelAnimationFrame(ctpFrames.pop());
  }

  window.ctpClearPageState = ctpClearPageState;
  window.ctpEnableTracking = function() { ctpTracking = true; };

  function wireDataHref(el) {
    if (!el.hasAttribute("role")) el.setAttribute("role", "link");
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");

    const go = () => {
      const url = el.dataset.href;
      if (!url) return;
      if (typeof window.ctpNavigate === "function") window.ctpNavigate(url);
      else location.href = url;
    };

    el.addEventListener("click", go);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
  }

  document.querySelectorAll("[data-href]").forEach(wireDataHref);
  
  (function bgMusic() {
    const ss = window.sessionStorage;
    const ls = window.localStorage;
    const CONSENT_KEY = "dough:bg-music:consent";
    const PLAYING_KEY = "dough:bg-music:playing";
    const TIME_KEY = "dough:bg-music:time";
    const ENABLED_KEY = "dough:bg-music:enabled";
    const VOLUME_KEY = "dough:bg-music:volume";

    const audio = document.createElement("audio");
    audio.id = "bgm";
    audio.dataset.ctpPersist = "";
    audio.src = "https://m.doughmination.gay/sfx/background.mp3";
    audio.loop = true;
    audio.preload = "auto";
    const savedVol = parseFloat(ls.getItem(VOLUME_KEY) ?? "");
    audio.volume = isNaN(savedVol) ? 0.1 : Math.min(1, Math.max(0, savedVol));
    audio.hidden = true;
    document.body.appendChild(audio);

    const savedTime = parseFloat(ss.getItem(TIME_KEY) || "0");
    if (savedTime > 0) {
      audio.addEventListener("loadedmetadata", () => {
        try { audio.currentTime = savedTime; } catch (e) { }
      }, { once: true });
    }

    audio.addEventListener("play", () => {
      ss.setItem(PLAYING_KEY, "1");
      ls.setItem(ENABLED_KEY, "1");
    });
    audio.addEventListener("pause", () => {
      ss.setItem(PLAYING_KEY, "0");
      ls.setItem(ENABLED_KEY, "0");
    });
    const volumeListeners = new Set<(volume: number) => void>();

    window.ctpBgm = {
      toggle() {
        if (audio.paused) audio.play().catch(() => { });
        else audio.pause();
      },
      isPaused() { return audio.paused; },
      subscribe(cb) {
        const h = () => cb(audio.paused);
        audio.addEventListener("play", h);
        audio.addEventListener("pause", h);
        cb(audio.paused);
        return () => {
          audio.removeEventListener("play", h);
          audio.removeEventListener("pause", h);
        };
      },
      getVolume() { return audio.volume; },
      setVolume(volume: number) {
        const next = Math.min(1, Math.max(0, volume));
        audio.volume = next;
        ls.setItem(VOLUME_KEY, String(next));
        volumeListeners.forEach((cb) => cb(next));
      },
      subscribeVolume(cb) {
        volumeListeners.add(cb);
        cb(audio.volume);
        return () => {
          volumeListeners.delete(cb);
        };
      },
    };

    function saveTime() {
      if (!isNaN(audio.currentTime)) ss.setItem(TIME_KEY, String(audio.currentTime));
    }
    window.addEventListener("pagehide", saveTime);
    setInterval(saveTime, 4000);

    function isReload() {
      const nav = performance.getEntriesByType("navigation")[0];
      return nav ? nav.type === "reload" : performance.navigation?.type === 1;
    }
    if (isReload()) {
      ss.removeItem(CONSENT_KEY);
      ss.removeItem(PLAYING_KEY);
    }

    if (ss.getItem(CONSENT_KEY) === "1") {
      if (ss.getItem(PLAYING_KEY) === "1") {
        audio.play().catch(() => {  });
      }
      return;
    }

    if (ls.getItem(ENABLED_KEY) === "0") {
      return;
    }

    const gate = document.createElement("div");
    gate.className = "bgm-gate";
    gate.dataset.ctpPersist = "";
    gate.setAttribute("role", "button");
    gate.tabIndex = 0;
    gate.innerHTML = `
    <div class="bgm-gate-panel">
      <p class="bgm-gate-note">${icon("music-note-beamed")} click to enter ${icon("music-note-beamed")}</p>
      <p class="bgm-gate-hint">turns on background music</p>
    </div>`;
    document.body.appendChild(gate);

    function enter() {
      ss.setItem(CONSENT_KEY, "1");
      audio.play().catch(() => { });
      gate.classList.add("is-leaving");
      gate.addEventListener("transitionend", () => gate.remove(), { once: true });
    }
    gate.addEventListener("click", enter, { once: true });
    gate.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); enter(); }
    });
  })();

  (function internalLinks() {
    "use strict";
    document.addEventListener("click", (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest("a[href]:not([data-href])");
      if (!a) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      let dest;
      try { dest = new URL(href, location.href); } catch (err) { return; }
      if (dest.origin !== location.origin || !/^https?:$/.test(dest.protocol)) return;
      if (typeof window.ctpNavigate !== "function") return;
      e.preventDefault();
      window.ctpNavigate(dest.pathname + dest.search + dest.hash);
    });
  })();

}
