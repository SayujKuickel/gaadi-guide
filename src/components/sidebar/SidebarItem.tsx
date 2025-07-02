import type { sidebarItem } from "@/constants/sidebarItems";
import type React from "react";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  item: sidebarItem;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isActive = false,
}) => {
  return (
    <li
      aria-label={`Sidebar button for ${item?.name}`}
      className={`flex-1 md:flex-auto md:w-full transition-all `}
    >
      <Link
        className="w-full h-full flex flex-col items-center text-center justify-center md:py-2"
        to={item?.url ? item?.url : "/"}
      >
        <i
          className={` text-2xl md:text-xl mb-1 rounded-4xl py-1 w-1/2 md:w-3/5 grid place-items-center transition-all ${
            isActive ? " bg-secondary/10" : ""
          } ${item?.icon}`}
        />
        <span className="text-xs capitalize pointer-events-none text-inherit">
          {item.name}
        </span>
      </Link>
    </li>
  );
};

export default SidebarItem;
