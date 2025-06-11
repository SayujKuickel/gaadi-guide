import type { sidebarItem } from "@/constants/sidebarItems";
import type React from "react";

interface SidebarItemProps {
  item: sidebarItem;
  sideBarIndex: number;
  setSidebarIndex: (key: number) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  sideBarIndex,
  setSidebarIndex,
}) => {
  return (
    <li
      aria-label={`Sidebar button for ${item?.name}`}
      onClick={() => setSidebarIndex(item.key)}
      className={`p-2 rounded-lg flex flex-col gap-1 items-center cursor-pointer text-offText hover:text-on-surface transition-all  ${
        sideBarIndex === item?.key && "bg-primary/10"
      }`}
    >
      <i className={`flex text-lg md:text-2xl ${item?.icon}`} />

      <span className={`text-xs md:text-sm pointer-events-none`}>
        {item.name}
      </span>
    </li>
  );
};

export default SidebarItem;
