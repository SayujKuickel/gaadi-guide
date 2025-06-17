import type { sidebarItem } from "@/constants/sidebarItems";
import type React from "react";
import type { NavigateFunction } from "react-router-dom";

interface SidebarItemProps {
  item: sidebarItem;
  sideBarIndex: number;
  setSidebarIndex: (key: number) => void;
  navigate: NavigateFunction;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  sideBarIndex,
  setSidebarIndex,
  navigate,
}) => {
  function handleSidebarClick() {
    setSidebarIndex(item.key);

    if (item?.type === "redirect" && item?.url) {
      navigate(item?.url);
    }
  }

  return (
    <li
      aria-label={`Sidebar button for ${item?.name}`}
      onClick={handleSidebarClick}
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
  );
};

export default SidebarItem;
