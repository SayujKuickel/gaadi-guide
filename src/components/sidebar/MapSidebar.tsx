import type { ReactNode } from "react";

interface MapSidebarContentsProps {
  children?: ReactNode;
}

const MapSidebarContents: React.FC<MapSidebarContentsProps> = ({
  children,
}) => {
  if (!children) return null;

  return (
    <div className="absolute z-[1000] bottom-0 left-0 md:top-0 md:left-0 w-full sm:w-fit h-fit">
      {children}
    </div>
  );
};

export default MapSidebarContents;
