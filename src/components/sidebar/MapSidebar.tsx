import { sidebarItems } from "@/constants/sidebarItems";
import SidebarItem from "./SidebarItem";
import type { ReactNode } from "react";

interface MapSidebarContentsProps {
  className?: string;
  children?: ReactNode;
}

const MapSidebarContents: React.FC<MapSidebarContentsProps> = ({
  className,
  children,
}) => {
  if (!children) return null;

  return (
    <div
      className="absolute left-0 bottom-20 w-full md:top-0 md:left-20 sm:h-fit sm:w-fit z-[99999] 
      pl-2 pr-2 pt-0 pb-2
      md:pl-2 md:pr-0 md:pt-2 md:pb-0 space-y-2"
    >
      {children}
    </div>
  );
};

export default MapSidebarContents;
