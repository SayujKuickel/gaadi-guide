import type React from "react";
import type { ReactNode } from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5;
  children: ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  className = "",
}) => {
  const headingClass = `text-text heading-${level} ${className}`;

  if (level === 1) return <h1 className={headingClass}>{children}</h1>;

  if (level === 2) return <h2 className={headingClass}>{children}</h2>;

  if (level === 3) return <h3 className={headingClass}>{children}</h3>;

  if (level === 4) return <h4 className={headingClass}>{children}</h4>;

  return <h5 className={headingClass}>{children}</h5>;
};

export default Heading;
