/* personal/src/components/chrome/menusProvider.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type MenuId = "nav" | "settings";

interface MenusContextValue {
  openMenu: MenuId | null;
  isOpen: (menu: MenuId) => boolean;
  toggle: (menu: MenuId) => void;
  close: () => void;
}

const MenusContext = createContext<MenusContextValue | null>(null);

export function MenusProvider({ children }: { children: ReactNode }) {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);

  const isOpen = useCallback((menu: MenuId) => openMenu === menu, [openMenu]);

  const toggle = useCallback((menu: MenuId) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  }, []);

  const close = useCallback(() => setOpenMenu(null), []);

  const value = useMemo(
    () => ({
      openMenu,
      isOpen,
      toggle,
      close,
    }),
    [openMenu, isOpen, toggle, close],
  );

  return <MenusContext.Provider value={value}>{children}</MenusContext.Provider>;
}

export function useMenus(): MenusContextValue {
  const ctx = useContext(MenusContext);
  if (!ctx) throw new Error("useMenus must be used within a MenusProvider");
  return ctx;
}
