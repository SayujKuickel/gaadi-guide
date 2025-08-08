import type { ReactNode } from "react";

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  if (!children) return null;

  return (
    <div className="absolute z-[9999] bottom-0 left-0 md:top-0 md:left-0 w-full sm:w-fit h-fit">
      {children}
    </div>
  );
};

export default SidebarLayout;
