/* personal/src/components/chrome/navItems.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import type { ComponentType, SVGProps } from "react";
import {
  Home,
  Users,
  Code,
  Discord,
  Server,
  Layout,
  Music,
  Grid3x3,
  BookOpen,
  Camera,
  Blocks,
  Gamepad,
} from "pixelarticons/react";
import type { TranslationKey } from "@/i18n/translate";

type IconProps = SVGProps<SVGSVGElement>;

export interface NavItem {
  labelKey: TranslationKey;
  href: string;
  Icon: ComponentType<IconProps>;
}

export const navItems: NavItem[] = [
  {
    labelKey: "nav.home",
    href: "/",
    Icon: Home,
  },
  {
    labelKey: "nav.coolPeople",
    href: "/cool-people",
    Icon: Users,
  },
  {
    labelKey: "nav.devInfo",
    href: "/dev-info",
    Icon: Code,
  },
  {
    labelKey: "nav.discord",
    href: "/discord",
    Icon: Discord,
  },
  {
    labelKey: "nav.servers",
    href: "/servers",
    Icon: Server,
  },
  {
    labelKey: "nav.projects",
    href: "/projects",
    Icon: Layout,
  },
  {
    labelKey: "nav.music",
    href: "/music",
    Icon: Music,
  },
  {
    labelKey: "nav.webring",
    href: "/88x31",
    Icon: Grid3x3,
  },
  {
    labelKey: "nav.guestbook",
    href: "/guestbook",
    Icon: BookOpen,
  },
  {
    labelKey: "nav.selfies",
    href: "/selfies",
    Icon: Camera,
  },
  {
    labelKey: "nav.minecraft",
    href: "/minecraft",
    Icon: Blocks,
  },
  {
    labelKey: "nav.genshin",
    href: "/genshin",
    Icon: Gamepad,
  },
];
