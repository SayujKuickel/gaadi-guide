import type { sidebarItem } from "@/constants/sidebarItems";
import type React from "react";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  item: sidebarItem;
  sideBarIndex: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, sideBarIndex }) => {
  return (
    <Link to={item?.url ? item?.url : "/"}>
      <li
        aria-label={`Sidebar button for ${item?.name}`}
        className={`p-2 rounded-lg flex flex-col gap-1 items-center cursor-pointer text-offText hover:text-on-surface transition-all`}
      >
        <i
          className={`flex text-3xl md:text-2xl ${
            sideBarIndex === item?.key
              ? item?.icon.replace("rr", "sr")
              : item?.icon
          }`}
        />

        <span className={`text-xs pointer-events-none`}>{item.name}</span>
      </li>
    </Link>
  );
};

export default SidebarItem;
