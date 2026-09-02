/* personal/src/app/privacy/page.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import type { Metadata } from "next";
import CookiePreferencesButton from "@components/chrome/cookiePreferencesButton";
import "@styles/cookieBanner.css";
import "@styles/pages/privacy.css";

const LAST_UPDATED = "1 September 2026";

export const metadata: Metadata = {
  title: "Privacy & Cookies — Clove Nytrix Doughmination Twilight",
  description:
    "What doughmination.gay stores, the cookies it uses, the third parties it talks to, and how to opt out of optional tracking.",
  alternates: { canonical: "https://doughmination.gay/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "doughmination.gay",
    title: "Privacy & Cookies",
    description:
      "What doughmination.gay stores, the cookies it uses, and how to opt out of optional tracking.",
    url: "https://doughmination.gay/privacy",
    locale: "en_GB",
  },
};

export default function PrivacyPage() {
  return (
    <main className="hub privacy-wrap">
      <header className="hub-header">
        <h1>Privacy &amp; Cookies</h1>
        <p className="privacy-updated">As of {LAST_UPDATED}.</p>
      </header>

      <div className="privacy-body">
        <p>
          This site is a personal homepage run by Clove Nytrix Doughmination
          Twilight (&ldquo;I&rdquo;, &ldquo;me&rdquo;). It is deployed as a
          static site on Cloudflare Pages. There are no user accounts. It
          carries Google AdSense ads, served non-personalized and only after
          you opt in. This page explains what is stored on your device, what
          leaves your browser, and how to control the optional parts.
        </p>

        <h2>Cookies this site sets itself</h2>
        <p>These are first-party and are treated as strictly necessary:</p>
        <ul>
          <li>
            <code>lang</code> — remembers your language choice so the right
            locale loads on your next visit. Lasts about a year.
          </li>
          <li>
            <code>dough-consent</code> — records your choices from the cookie
            banner (whether analytics and advertising are allowed). Lasts about
            six months, after which the banner asks again.
          </li>
        </ul>
        <p>
          You cannot turn these off while using the site; they carry no
          identifier and are not shared with anyone.
        </p>

        <h2>Stored on your device (not cookies, never sent anywhere)</h2>
        <p>
          The site keeps a few values in your browser&rsquo;s local storage to
          remember preferences and to avoid re-fetching things. They stay on
          your device and are not transmitted:
        </p>
        <ul>
          <li>your language, and whether sound effects are muted;</li>
          <li>
            whether the on-screen cat is hidden, and its last position;
          </li>
          <li>
            a cached visitor-counter value and a per-tab session marker, so a
            refresh does not double-count you;
          </li>
          <li>
            cached album art and a cached map look-up, purely to speed up repeat
            views.
          </li>
        </ul>
        <p>Clearing site data in your browser removes all of these.</p>

        <h2>Optional: analytics</h2>
        <p>
          If — and only if — you choose &ldquo;Accept all&rdquo; or enable
          analytics in &ldquo;Customize&rdquo;, the site loads{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics 4
          </a>{" "}
          (Google Ireland Ltd / Google LLC). It sets <code>_ga</code> cookies
          and reports page views, approximate location (from IP, which Google
          does not log in full for GA4), device and browser type. I use this
          only to see rough traffic levels. If you reject optional cookies,
          Google Analytics is never loaded. You can change your mind at any time
          with the button below.
        </p>

        <h2>Optional: advertising</h2>
        <p>
          If — and only if — you choose &ldquo;Accept all&rdquo; or enable
          advertising in &ldquo;Customize&rdquo;, the site loads{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google AdSense
          </a>{" "}
          (Google Ireland Ltd / Google LLC) to show ads. Ads are always
          requested <strong>non-personalized</strong>: they are not targeted
          using a profile of you, and the site does not use a certified
          consent-management platform for personalized advertising. Even so,
          AdSense sets cookies on Google&rsquo;s domains for frequency capping,
          ad measurement and fraud prevention, and Google receives your IP
          address and user-agent. Nothing from Google&rsquo;s ad stack loads
          until you opt in, and you can withdraw consent at any time with the
          button below (a page reload then clears the rest). See{" "}
          <a
            href="https://support.google.com/adsense/answer/7549925"
            target="_blank"
            rel="noopener noreferrer"
          >
            how Google uses cookies in advertising
          </a>
          .
        </p>

        <h2>Other third parties involved in loading the site</h2>
        <ul>
          <li>
            <strong>Cloudflare</strong> — hosting and CDN. Cloudflare processes
            your IP address to serve the site and for security; it may set a
            strictly-necessary security cookie. See{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare&rsquo;s privacy policy
            </a>
            .
          </li>
          <li>
            <strong>Visitor counter</strong> — the hit counter calls{" "}
            <code>abacus.jasoncameron.dev</code>, a third-party count API. It
            receives your request but sets no cookies and stores no personal
            data beyond an aggregate tally.
          </li>
          <li>
            <strong>Asset hosts</strong> — fonts, sound effects, images and 3D
            models load from <code>m.doughmination.gay</code>; some avatars and
            album art load from Discord, Spotify and <code>wsrv.nl</code>; the
            location map loads tiles from OpenStreetMap. These see your IP and
            request headers as any web request does.
          </li>
          <li>
            <strong>Live presence data</strong> — Discord status, devices and
            location shown on the site come from my own API at{" "}
            <code>doughmination.uk</code>. That is my data about me, not about
            you.
          </li>
        </ul>

        <h2>The guestbook</h2>
        <p>
          If you sign the guestbook, the name and message you type are sent to
          my guestbook API and shown publicly on the site until removed. Do not
          put anything private in it. A{" "}
          <a
            href="https://www.cloudflare.com/products/turnstile/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare Turnstile
          </a>{" "}
          anti-spam check and a hidden honeypot field may run when you submit.
          Ask me (see contact) to remove an entry.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>Use the button below to review or withdraw analytics consent.</li>
          <li>
            Block or delete cookies in your browser settings — the site still
            works.
          </li>
          <li>
            Send a &ldquo;Do Not Track&rdquo; signal; analytics stays off unless
            you explicitly opt in here regardless.
          </li>
        </ul>

        <h2>Your rights</h2>
        <p>
          If you are in the UK or EU, you have rights under the UK GDPR / GDPR
          to access, correct or erase personal data I hold about you, and to
          object to processing. In practice the only data tied to you is a
          guestbook entry you chose to post, plus server/CDN logs. To make a
          request, or to complain, email me at{" "}
          <a href="mailto:clove@doughmination.win">clove@doughmination.win</a>.
          You can also complain to the UK Information
          Commissioner&rsquo;s Office at{" "}
          <a
            href="https://ico.org.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ico.org.uk
          </a>
          .
        </p>

        <h2>Changes</h2>
        <p>
          The date at the top of this page shows when it last changed. Your
          saved cookie choice is re-requested at least every six months, and
          sooner if a change to what loads means the old choice no longer
          covers it.
        </p>

        <CookiePreferencesButton />
      </div>
    </main>
  );
}
