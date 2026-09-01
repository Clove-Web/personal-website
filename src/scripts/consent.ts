/* personal/src/scripts/consent.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/*
 * Cookie-consent state, shared by the banner (CookieBanner.tsx), the analytics
 * loader (Analytics.tsx) and the ad loader (AdSense.tsx / AdUnit.tsx).
 *
 * Three categories:
 *   - operational  : always on, cannot be declined (language cookie, the small
 *                    localStorage keys the widgets use, the honeypot/Turnstile
 *                    on the guestbook). No script is gated on it.
 *   - analytics    : optional. Google Analytics only loads once this is granted.
 *   - advertising  : optional. Google AdSense only loads once this is granted,
 *                    and only ever in non-personalized mode.
 *
 * The decision lives in a first-party cookie so the edge (and a fresh page
 * load) can read it too, and is mirrored into localStorage under the same key
 * so a quick client read doesn't have to parse document.cookie and so other
 * tabs get a real `storage` event. `null` from readConsent() means "not decided
 * yet" — that is what makes the banner show.
 */

const COOKIE_NAME = "dough-consent";
const STORAGE_KEY = "dough-consent";
// Bumped to 2 when the `advertising` category was added: v1 records don't
// carry a choice for it, so they read back as null and the banner asks again.
const COOKIE_VERSION = 2;

// Six months. The ICO guidance is to re-ask for consent periodically rather
// than treat it as permanent; a browser year would be too long.
const COOKIE_MAX_AGE = 60 * 60 * 24 * 182;

/** Fired on window whenever the stored decision changes. */
export const CONSENT_EVENT = "dough-consent-change";

/** Fired on window to re-open the banner (e.g. from the privacy page). */
export const OPEN_SETTINGS_EVENT = "dough-open-cookie-settings";

export interface ConsentState {
  analytics: boolean;
  advertising: boolean;
}

interface StoredConsent {
  v: number;
  analytics: boolean;
  advertising: boolean;
}

function isBrowser(): boolean {
  return typeof document !== "undefined";
}

/** Parse a stored JSON blob into a ConsentState, or null if it's stale/bad. */
function parseStored(raw: string | null): ConsentState | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredConsent;

    if (parsed.v !== COOKIE_VERSION) return null;

    return {
      analytics: parsed.analytics === true,
      advertising: parsed.advertising === true,
    };
  } catch {
    return null;
  }
}

/** The raw cookie value for our key, decoded, or null. */
function readCookieRaw(): string | null {
  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));

  if (!match) return null;

  try {
    return decodeURIComponent(match.slice(COOKIE_NAME.length + 1));
  } catch {
    return null;
  }
}

/**
 * The current decision, or null when the visitor has not chosen yet. The
 * cookie is the source of truth (the edge reads it too); localStorage is a
 * fallback for when the cookie is missing but the mirror survived.
 */
export function readConsent(): ConsentState | null {
  if (!isBrowser()) return null;

  const fromCookie = parseStored(readCookieRaw());
  if (fromCookie) return fromCookie;

  try {
    return parseStored(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

/** True once the visitor has made any choice. */
export function isDecided(): boolean {
  return readConsent() !== null;
}

/** Persist a decision and notify listeners (the banner and the GA loader). */
export function writeConsent(state: ConsentState): void {
  if (!isBrowser()) return;

  const payload: StoredConsent = {
    v: COOKIE_VERSION,
    analytics: state.analytics === true,
    advertising: state.advertising === true,
  };

  const json = JSON.stringify(payload);

  document.cookie =
    `${COOKIE_NAME}=${encodeURIComponent(json)}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;

  // Mirror to localStorage: lets a client read skip cookie parsing, and gives
  // other open tabs a real `storage` event (cookie writes don't emit one).
  try {
    window.localStorage.setItem(STORAGE_KEY, json);
  } catch {
    // Private mode / storage disabled — the cookie still carries the decision.
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}

/** Accept every category. */
export function acceptAll(): void {
  writeConsent({ analytics: true, advertising: true });
}

/** Keep only the operational cookies; decline the optional ones. */
export function rejectOptional(): void {
  writeConsent({ analytics: false, advertising: false });
}

/** Ask the banner to show itself again so the visitor can change their mind. */
export function openCookieSettings(): void {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
}

/**
 * Subscribe to decision changes. Fires on this tab's own writes (via the
 * custom event) and on writes from other tabs (via the storage event, which
 * the localStorage mirror in writeConsent() now emits — cookie writes alone
 * don't).
 */
export function subscribeConsent(callback: () => void): () => void {
  if (!isBrowser()) return () => {};

  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
