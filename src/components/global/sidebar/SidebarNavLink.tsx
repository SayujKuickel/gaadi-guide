import type { ISidebarItem } from "@/constants/sidebarItems";
import type React from "react";
import { Link } from "react-router-dom";

interface SidebarNavLinkProps {
  item: ISidebarItem;
  isActive?: boolean;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({
  item,
  isActive = false,
}) => {
  return (
    <li
      aria-label={`Navigation Button for ${item?.name}`}
      className="flex-1 nth-[2]:border-x-1 nth-[2]:border-surface-3/50 md:flex-auto md:w-full"
    >
      <Link
        className="w-full h-full flex flex-col items-center text-center justify-center md:py-2"
        to={item?.url ?? "/"}
      >
        <span
          className={`text-2xl md:text-xl mb-1.5 rounded-4xl py-1 max-w-16 w-[50%] md:w-[75%] grid place-items-center transition-all ${
            isActive ? "bg-secondary/25 text-text" : ""
          } `}
        >
          {item?.icon}
        </span>

        <span className="text-xs capitalize pointer-events-none text-inherit">
          {item?.name}
        </span>
      </Link>
    </li>
  );
};

export default SidebarNavLink;
