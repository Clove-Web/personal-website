/* personal/src/scripts/consent.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

const COOKIE_NAME = "dough-consent";
const STORAGE_KEY = "dough-consent";
const COOKIE_VERSION = 2;

const COOKIE_MAX_AGE = 60 * 60 * 24 * 182;

export const CONSENT_EVENT = "dough-consent-change";

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

export function isDecided(): boolean {
  return readConsent() !== null;
}

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

  try {
    window.localStorage.setItem(STORAGE_KEY, json);
  } catch {
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}

export function acceptAll(): void {
  writeConsent({ analytics: true, advertising: true });
}

export function rejectOptional(): void {
  writeConsent({ analytics: false, advertising: false });
}

export function openCookieSettings(): void {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
}

export function subscribeConsent(callback: () => void): () => void {
  if (!isBrowser()) return () => {};

  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
