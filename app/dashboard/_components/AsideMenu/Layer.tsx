import React from "react";
import { mdiLogout, mdiClose } from "@mdi/js";
import Icon from "../../../_components/Icon";
import AsideMenuItem from "./Item";
import AsideMenuList from "./List";
import { MenuAsideItem } from "../../../_interfaces";

type Props = {
  menu: MenuAsideItem[];
  className?: string;
  onAsideLgCloseClick: () => void;
  onRouteChange: () => void;
};

export default function AsideMenuLayer({
  menu,
  className = "",
  ...props
}: Props) {

  const logoutItem: MenuAsideItem = {
    label: "Logout",
    icon: mdiLogout,
    color: "info",
    isLogout: true,
  };

  const handleAsideLgCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onAsideLgCloseClick();
  };

  return (
    <aside
      className={`${className} lg:py-2 lg:pl-2 w-72 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
    >
      <div className="bg-black/50 backdrop-blur-md border-r border-white/10 lg:rounded-2xl flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-row h-16 items-center justify-between px-6">
          <div className="text-center flex-1 lg:text-left xl:text-center xl:pl-0">
            <b className="font-bold text-white text-lg">MojaSMS</b>
          </div>
          <button
            className="hidden lg:inline-block xl:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={handleAsideLgCloseClick}
          >
            <Icon path={mdiClose} size="20" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3">
          <AsideMenuList menu={menu} onRouteChange={props.onRouteChange} />
        </div>
        <div className="p-3 border-t border-white/10">
          <AsideMenuItem item={logoutItem} onRouteChange={props.onRouteChange} />
        </div>
      </div>
    </aside>
  );
}
