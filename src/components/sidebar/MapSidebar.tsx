import { sidebarItems } from "@/constants/sidebarItems";
import SidebarItem from "./SidebarItem";
import type { ReactNode } from "react";

interface MapSidebarProps {
  className?: string;
  children?: ReactNode;
}

const MapSidebar: React.FC<MapSidebarProps> = ({ className, children }) => {
  return (
    <aside
      className={`fixed bg-surface border-t-2 border-t-surface-3 border-r-0 md:border-t-0 md:border-r-2 md:border-r-surface-3 ${className} w-screen h-20 pb-2 left-0 bottom-0 md:top-0 z-[99999] md:w-20 md:h-screen`}
    >
      <div className="w-full place-items-center my-6 hidden md:visible md:grid">
        <img
          src="/web-app-manifest-512x512.png"
          className="w-16 aspect-square"
          width={100}
          height={100}
          alt="logo for kathmandu bus routes"
        />
      </div>

      <ul className="flex flex-row items-center justify-around md:justify-start md:flex-col gap-1 p-2">
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} item={item} sideBarIndex={-1} />
        ))}
      </ul>

      <div
        className="absolute left-0 bottom-20 w-full md:top-0 md:left-20 sm:h-fit sm:w-fit z-[99999] 
      pl-2 pr-2 pt-0 pb-2
      md:pl-2 md:pr-0 md:pt-2 md:pb-0 space-y-2"
      >
        {children}
      </div>
    </aside>
  );
};

export default MapSidebar;
