import type { ReactNode } from "react";

interface ContainerLayoutProps {
  children: ReactNode;
  isCenter?: boolean;
  isSmall?: boolean;
  className?: string;
  size?: "" | "xs" | "sm";
}

const containerClasses = {
  "": "container",
  sm: "container-sm",
  xs: "container-xs",
};

const ContainerLayout: React.FC<ContainerLayoutProps> = ({
  children,
  isCenter = true,
  size = "",
  className = "",
}) => {
  return (
    <div
      className={`px-4 ${containerClasses[size]} ${
        isCenter ? "mx-auto" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default ContainerLayout;
