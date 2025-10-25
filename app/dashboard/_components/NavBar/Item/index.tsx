"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { mdiChevronUp, mdiChevronDown } from "@mdi/js";
import Divider from "../../../../_components/Divider";
import Icon from "../../../../_components/Icon";
import UserAvatarCurrentUser from "../../UserAvatar/CurrentUser";
import NavBarMenuList from "../MenuList";
import { useAppDispatch, useAppSelector } from "../../../../_stores/hooks";
import { MenuNavBarItem } from "../../../../_interfaces";
import { setDarkMode } from "../../../../_stores/darkModeSlice";
import { logout } from "../../../../_stores/authSlice";
import { useRouter } from "next/navigation";

type Props = {
  item: MenuNavBarItem;
  onRouteChange: () => void;
};

export default function NavBarItem({ item, ...props }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userName = useAppSelector((state) =>{
    return `${state.auth.user?.firstname} ${state.auth.user?.lastname}`});

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const componentClass = [
    "block lg:flex items-center relative cursor-pointer",
    isDropdownActive
      ? `text-white bg-white/10`
      : `text-white hover:text-gray-300 hover:bg-white/5`,
    item.menu ? "lg:py-2 lg:px-3" : "py-2 px-3",
    item.isDesktopNoLabel ? "lg:w-16 lg:justify-center" : "",
    "transition-all duration-200 rounded-lg"
  ].join(" ");

  const itemLabel = item.isCurrentUser ? userName : item.label;

  const handleMenuClick = () => {
    if (item.menu) {
      setIsDropdownActive(!isDropdownActive);
    }

    if (item.isToggleLightDark) {
      dispatch(setDarkMode(null));
    }

    if (item.isLogout) {
      dispatch(logout());
      router.push('/login');
    }
  };

  const NavBarItemComponentContents = (
    <>
      <div
        className={`flex items-center ${
          item.menu
            ? "bg-white/5 lg:bg-transparent p-3 lg:p-0"
            : ""
        }`}
        onClick={handleMenuClick}
      >
        {item.isCurrentUser && (
          <UserAvatarCurrentUser className="w-6 h-6 mr-3 inline-flex" />
        )}
        {item.icon && <Icon path={item.icon} className="transition-colors text-white" />}
        <span
          className={`px-2 transition-colors text-white font-medium ${
            item.isDesktopNoLabel && item.icon ? "lg:hidden" : ""
          }`}
        >
          {itemLabel}
        </span>
        {item.menu && (
          <Icon
            path={isDropdownActive ? mdiChevronUp : mdiChevronDown}
            className="hidden lg:inline-flex transition-colors text-white ml-1"
          />
        )}
      </div>
      {item.menu && (
        <div
          className={`${
            !isDropdownActive ? "lg:hidden" : ""
          } text-sm border-b border-white/10 lg:border lg:bg-black/90 lg:backdrop-blur-md lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:rounded-lg lg:shadow-lg lg:border-white/10`}
        >
          <NavBarMenuList
            menu={item.menu}
            onRouteChange={props.onRouteChange}
          />
        </div>
      )}
    </>
  );

  if (item.isDivider) {
    return <Divider navBar />;
  }

  if (item.href) {
    return (
      <Link
        href={item.href}
        target={item.target}
        className={componentClass}
        onClick={props.onRouteChange}
      >
        {NavBarItemComponentContents}
      </Link>
    );
  }

  return <div className={componentClass}>{NavBarItemComponentContents}</div>;
}
