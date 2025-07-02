import type { ReactNode } from "react";

interface ContainerLayoutProps {
  children: ReactNode;
  isCenter?: boolean;
  isSmall?: boolean;
  className?: string;
}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({
  children,
  isCenter = true,
  isSmall = true,
  className = "",
}) => {
  return (
    <div
      className={`px-4 
        ${isSmall ? "container-small" : "container"} 
        ${isCenter ? "mx-auto" : ""} 
        ${className}`}
    >
      {children}
    </div>
  );
};

export default ContainerLayout;
