/* personal/src/components/chrome/navMenu.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "./navItems";
import { playOpenSound, playCloseSound, playHoverSound, playClickSound } from "@lib/sound";
import { useLanguage } from "@/i18n/languageProvider";
import { localizedPath, stripLocalePrefix } from "@/i18n/config";
import { useMenus } from "./menusProvider";

function normalize(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

export default function NavMenu() {
  const { t, lang } = useLanguage();

  const { isOpen, toggle } = useMenus();
  const navOpen = isOpen("nav");

  const current = normalize(stripLocalePrefix(usePathname()));

  function handleToggleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      playOpenSound();
    } else {
      playCloseSound();
    }
    toggle("nav");
  }

  return (
    <header className="nav">
      <input
        type="checkbox"
        id="nav-toggle"
        className="nav-toggle"
        aria-label="Toggle navigation menu"
        checked={navOpen}
        onChange={handleToggleChange}
      />
      <label
        htmlFor="nav-toggle"
        className="nav-burger"
        aria-hidden="true"
        onMouseEnter={playHoverSound}
      >
        <span></span>
        <span></span>
        <span></span>
      </label>

      <nav className="nav-links">
        {navItems.map(({ labelKey, href, Icon }) => {
          const label = t(labelKey);
          const external = href.startsWith("http");
          const selected = !external && normalize(href) === current;
          const className = `nav-link${selected ? " selected" : ""}`;

          const linkHref = external ? href : localizedPath(href, lang);

          const inner = (
            <>
              <span className="nav-ico" aria-hidden="true">
                <Icon />
              </span>
              <span className="nav-label">{label}</span>
            </>
          );

          if (external) {
            return (
              <a
                key={href}
                className={className}
                href={href}
                aria-label={label}
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                {inner}
              </a>
            );
          }

          return (
            <Link
              key={href}
              className={className}
              href={linkHref}
              aria-label={label}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              {inner}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}