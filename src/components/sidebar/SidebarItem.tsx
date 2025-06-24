import type { sidebarItem } from "@/constants/sidebarItems";
import type React from "react";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  item: sidebarItem;
  sideBarIndex: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  return (
    <li
      aria-label={`Sidebar button for ${item?.name}`}
      className={`flex-1 md:flex-auto md:w-full text-offText/90 hover:text-text transition-all`}
    >
      <Link
        className="w-full h-full  flex flex-col items-center text-center justify-center md:py-2"
        to={item?.url ? item?.url : "/"}
      >
        <i className={`flex text-3xl md:text-2xl mb-2 ${item?.icon} `} />
        <span className={`text-xs capitalize pointer-events-none text-inherit`}>
          {item.name}
        </span>
      </Link>
    </li>
  );
};

export default SidebarItem;
