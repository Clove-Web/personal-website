/* personal/src/components/chrome/cookieBanner.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/i18n/languageProvider";
import { localizedPath } from "@/i18n/config";
import { playClickSound } from "@lib/sound";
import {
  acceptAll,
  rejectOptional,
  writeConsent,
  readConsent,
  subscribeConsent,
  OPEN_SETTINGS_EVENT,
} from "@scripts/consent";

export default function CookieBanner() {
  const { lang } = useLanguage();
  const privacyHref = localizedPath("/privacy", lang);

  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [customising, setCustomising] = useState(false);

  const [analyticsChoice, setAnalyticsChoice] = useState(false);
  const [advertisingChoice, setAdvertisingChoice] = useState(false);

  useEffect(() => {
    setReady(true);
    setVisible(readConsent() === null);

    const unsubscribe = subscribeConsent(() => {
      if (readConsent() !== null) setVisible(false);
    });

    const reopen = () => {
      const current = readConsent();
      setAnalyticsChoice(current?.analytics ?? false);
      setAdvertisingChoice(current?.advertising ?? false);
      setCustomising(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);

    return () => {
      unsubscribe();
      window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
    };
  }, []);

  const onAcceptAll = useCallback(() => {
    playClickSound();
    acceptAll();
    setVisible(false);
  }, []);

  const onRejectOptional = useCallback(() => {
    playClickSound();
    rejectOptional();
    setVisible(false);
  }, []);

  const onToggleCustomise = useCallback(() => {
    playClickSound();
    setCustomising((open) => {
      if (!open) {
        const current = readConsent();
        setAnalyticsChoice(current?.analytics ?? false);
        setAdvertisingChoice(current?.advertising ?? false);
      }
      return !open;
    });
  }, []);

  const onSave = useCallback(() => {
    playClickSound();
    writeConsent({
      analytics: analyticsChoice,
      advertising: advertisingChoice,
    });
    setVisible(false);
  }, [analyticsChoice, advertisingChoice]);

  if (!ready || !visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
    >
      <p className="cb-title">Cookies on doughmination.gay</p>

      <p className="cb-text">
        Operational cookies keep the site working (your language choice, small
        preferences) and are always on. The optional ones are analytics (Google
        Analytics, for rough visitor numbers) and advertising (Google AdSense,
        non-personalized only). Full details are in the{" "}
        <a className="cb-link" href={privacyHref}>
          Privacy &amp; Cookies
        </a>{" "}
        page.
      </p>

      {customising && (
        <div className="cb-panel">
          <div className="cb-row">
            <div className="cb-row-main">
              <span className="cb-row-label">Operational</span>
              <span className="cb-row-desc">
                Language cookie and small on-device preferences. Needed for the
                site to work, so these cannot be turned off.
              </span>
            </div>
            <span className="cb-always">always on</span>
          </div>

          <div className="cb-row">
            <div className="cb-row-main">
              <span className="cb-row-label">Analytics</span>
              <span className="cb-row-desc">
                Google Analytics. Loads only if you allow it here.
              </span>
            </div>
            <input
              type="checkbox"
              className="cb-toggle"
              checked={analyticsChoice}
              aria-label="Allow analytics cookies"
              onChange={(event) => setAnalyticsChoice(event.target.checked)}
            />
          </div>

          <div className="cb-row">
            <div className="cb-row-main">
              <span className="cb-row-label">Advertising</span>
              <span className="cb-row-desc">
                Google AdSense, non-personalized only. Still uses cookies for
                frequency capping and fraud prevention. Loads only if you allow
                it here.
              </span>
            </div>
            <input
              type="checkbox"
              className="cb-toggle"
              checked={advertisingChoice}
              aria-label="Allow advertising cookies"
              onChange={(event) => setAdvertisingChoice(event.target.checked)}
            />
          </div>
        </div>
      )}

      <div className="cb-actions">
        <button
          type="button"
          className="cb-btn cb-primary"
          onClick={onAcceptAll}
        >
          accept all
        </button>

        <button
          type="button"
          className="cb-btn"
          onClick={onRejectOptional}
        >
          reject optional
        </button>

        {customising ? (
          <button
            type="button"
            className="cb-btn"
            onClick={onSave}
          >
            save choices
          </button>
        ) : (
          <button
            type="button"
            className="cb-btn"
            aria-expanded={customising}
            onClick={onToggleCustomise}
          >
            customize
          </button>
        )}
      </div>
    </div>
  );
}
