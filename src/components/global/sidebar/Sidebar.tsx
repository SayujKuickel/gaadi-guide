import React from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarNavLink from "@/components/global/sidebar/SidebarNavLink";

import logo from "@/assets/logo-192x192.png";
import { siteUrlMappings } from "@/constants/siteConfigs";
import { sidebarItems } from "@/constants/sidebarItems";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="bg-surface border-t-2 border-t-surface-3 border-r-0 md:border-t-0 md:border-r-2 md:border-r-surface-3 w-screen md:w-20 py-3 md:py-1">
      <Link
        to={`/${siteUrlMappings.search}`}
        className="hidden w-full place-items-center md:grid mt-2"
      >
        <img
          src={logo}
          className="w-10 aspect-square"
          width={100}
          height={100}
          alt="Main logo for Gaadi Guide"
        />
      </Link>

      <hr className="hidden md:block w-2/3 mx-auto mt-4 mb-5 border-offText/35" />

      <ul className="flex items-center md:flex-col justify-around md:gap-2">
        {sidebarItems
          .sort((a, b) => a.key - b.key)
          .map((item) => (
            <SidebarNavLink
              key={item.url}
              item={item}
              isActive={location.pathname.startsWith(item.url || "")}
            />
          ))}
      </ul>
    </aside>
  );
};

export default React.memo(Sidebar);
