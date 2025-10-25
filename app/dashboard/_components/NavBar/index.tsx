"use client";

import React, { ReactNode, useState } from "react";
import { mdiClose, mdiDotsVertical } from "@mdi/js";
import { containerMaxW } from "../../../_lib/config";
import Icon from "../../../_components/Icon";
import NavBarItemPlain from "./Item/Plain";
import NavBarMenuList from "./MenuList";
import { MenuNavBarItem } from "../../../_interfaces";

type Props = {
  menu: MenuNavBarItem[];
  className: string;
  children: ReactNode;
};

export default function NavBar({ menu, className = "", children }: Props) {
  const [isMenuNavBarActive, setIsMenuNavBarActive] = useState(false);

  const handleMenuNavBarToggleClick = () => {
    setIsMenuNavBarActive(!isMenuNavBarActive);
  };

  const handleRouteChange = () => {
    setIsMenuNavBarActive(false)
  }

  return (
    <nav
      className={`${className} top-0 inset-x-0 fixed bg-black/80 backdrop-blur-md border-b border-white/10 h-16 z-30 transition-position w-screen lg:w-auto`}
    >
      <div className={`flex lg:items-stretch ${containerMaxW}`}>
        <div className="flex flex-1 items-stretch h-16">{children}</div>
        <div className="flex-none items-stretch flex h-16 lg:hidden">
          <NavBarItemPlain onClick={handleMenuNavBarToggleClick}>
            <Icon
              path={isMenuNavBarActive ? mdiClose : mdiDotsVertical}
              size="24"
              className="text-white"
            />
          </NavBarItemPlain>
        </div>
        <div
          className={`${
            isMenuNavBarActive ? "block" : "hidden"
          } max-h-screen-menu overflow-y-auto lg:overflow-visible absolute w-screen top-16 left-0 bg-black/90 backdrop-blur-md border-b border-white/10 lg:w-auto lg:flex lg:static lg:shadow-none`}
        >
          <NavBarMenuList menu={menu} onRouteChange={handleRouteChange} />
        </div>
      </div>
    </nav>
  );
}
