/* personal/src/app/layout.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import type { Metadata, Viewport } from "next";
import NavBridge from "./_components/navBridge";
import SoundFX from "./soundFX";
import Providers from "./providers";
import Analytics from "@components/chrome/analytics";
import AdSense from "@components/chrome/adSense";
import CookieBanner from "@components/chrome/cookieBanner";
import SettingsMenu from "@components/chrome/settingsMenu";
import NavMenu from "@components/chrome/navMenu";
import { MenusProvider } from "@components/chrome/menusProvider";
import SiteChrome from "@components/chrome/siteChrome";
import { LanguageProvider } from "@/i18n/languageProvider";
import "@styles/themes.css";
import "@styles/fonts.css";
import "@styles/base.css";
import "@styles/bgMusic.css";
import "@styles/layout.css";
import "@styles/nav.css";
import "@styles/visitorCounter.css";
import "@styles/sections.css";
import "@styles/scrollWrap.css";
import "@styles/cookieBanner.css";
import "@styles/responsive.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://doughmination.gay"),
  title: "Clove Nytrix Doughmination Twilight",
  description:
    "The homepage and hub for everything Clove Nytrix Doughmination Twilight — projects, music, Discord presence, dev stats, and more.",
  keywords: [
    "Clove Nytrix Doughmination Twilight",
    "doughmination.gay",
    "portfolio",
    "personal",
    "developer",
    "homepage",
  ],
  authors: [{ name: "doughmination" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://doughmination.gay",
  },
  icons: {
    icon: [
      {
        url: "https://m.doughmination.gay/img/avatars/favicon.png",
        type: "image/png"
      },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "doughmination.gay",
    title: "Clove Nytrix Doughmination Twilight",
    description:
      "The homepage and hub for everything Clove Nytrix Doughmination Twilight — projects, music, Discord presence, dev stats, and more.",
    url: "https://doughmination.gay",
    locale: "en_GB",
    images: [
      {
        url: "https://m.doughmination.gay/img/avatars/favicon.png",
        alt: "Clove Nytrix Doughmination Twilight logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@DoughminCEO",
    creator: "@DoughminCEO",
    title: "Clove Nytrix Doughmination Twilight",
    description:
      "The homepage and hub for everything Clove Nytrix Doughmination Twilight — projects, music, Discord presence, dev stats, and more.",
    images: ["https://m.doughmination.gay/img/avatars/favicon.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5a9b8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://doughmination.uk" crossOrigin="" />
        <link rel="dns-prefetch" href="https://doughmination.uk" />
        <link rel="preconnect" href="https://abacus.jasoncameron.dev" crossOrigin="" />
        <link rel="dns-prefetch" href="https://abacus.jasoncameron.dev" />
        <link rel="preconnect" href="https://m.doughmination.gay" crossOrigin="" />
        <link rel="dns-prefetch" href="https://m.doughmination.gay" />
      </head>
      <body>
        <LanguageProvider>
          <MenusProvider>
            <NavMenu />

            <SettingsMenu />
          </MenusProvider>

          <NavBridge />

          <Providers>{children}</Providers>

          <SiteChrome />

          <SoundFX />

          <Analytics />
          <AdSense />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
