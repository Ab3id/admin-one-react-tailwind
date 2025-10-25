"use client";

import React, { useEffect, useState } from "react";
import { mdiMinus, mdiPlus } from "@mdi/js";
import Icon from "../../../_components/Icon";
import Link from "next/link";
import { getButtonColor } from "../../../_lib/colors";
import AsideMenuList from "./List";
import { MenuAsideItem } from "../../../_interfaces";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "../../../_stores/hooks";
import { logout } from "../../../_stores/authSlice";

type Props = {
  item: MenuAsideItem;
  onRouteChange: () => void;
  isDropdownList?: boolean;
};

const AsideMenuItem = ({ item, isDropdownList = false, ...props }: Props) => {
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dispatch = useAppDispatch();

  const activeClassAddon =
    !item.color && isLinkActive ? "aside-menu-item-active font-bold" : "";

  const pathname = usePathname();

  useEffect(() => {
    setIsLinkActive(item.href === pathname);
  }, [item.href, pathname]);

  const handleLogout = () => {
    dispatch(logout());
    props.onRouteChange();
  };

  const asideMenuItemInnerContents = (
    <>
      {item.icon && (
        <Icon
          path={item.icon}
          className={`flex-none ${activeClassAddon}`}
          w="w-16"
          size="18"
        />
      )}
      <span
        className={`grow text-ellipsis line-clamp-1 ${
          item.menu ? "" : "pr-12"
        } ${activeClassAddon}`}
      >
        {item.label}
      </span>
      {item.menu && (
        <Icon
          path={isDropdownActive ? mdiMinus : mdiPlus}
          className={`flex-none ${activeClassAddon}`}
          w="w-12"
        />
      )}
    </>
  );

  const componentClass = [
    "flex cursor-pointer rounded-xl transition-all duration-200",
    isDropdownList ? "py-2 px-4 text-sm" : "py-3 px-4 mx-1 mb-1",
    item.color
      ? getButtonColor(item.color, false, true)
      : `text-gray-300 hover:text-white hover:bg-white/10 ${isLinkActive ? 'bg-white/10 text-white' : ''}`,
  ].join(" ");

  return (
    <li>
      {item.href && (
        <Link
          href={item.href}
          target={item.target}
          className={componentClass}
          onClick={props.onRouteChange}
        >
          {asideMenuItemInnerContents}
        </Link>
      )}
      {!item.href && (
        <div
          className={componentClass}
          onClick={() => {
            if (item.isLogout) {
              console.log('Logging out...');
              handleLogout();
            } else {
              setIsDropdownActive(!isDropdownActive);
            }
          }}
        >
          {asideMenuItemInnerContents}
        </div>
      )}
      {item.menu && (
        <AsideMenuList
          menu={item.menu}
          className={`aside-menu-dropdown ${
            isDropdownActive ? "block dark:bg-slate-800/50" : "hidden"
          }`}
          onRouteChange={props.onRouteChange}
          isDropdownList
        />
      )}
    </li>
  );
};

export default AsideMenuItem;
