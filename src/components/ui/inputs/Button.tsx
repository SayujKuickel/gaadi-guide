import type { ReactNode } from "react";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  title?: string;
  icon?: ReactNode;
  className?: string;
  ariaLabel: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "error" | "ghost" | "accent" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  title,
  icon,
  className = "",
  type = "button",
  ariaLabel,
  variant = "primary",
}) => {
  const variantStyles = {
    primary: "bg-surface-2 hover:bg-surface-3 text-text",
    secondary:
      "bg-transparent hover:bg-surface-1 text-text border border-surface-3",
    error: "bg-red-600/10 hover:bg-red-600/20 text-red-400",
    ghost: "bg-transparent hover:bg-surface-1 text-text",
    accent: "bg-sa-blue/15 hover:bg-sa-blue/50 text-on-accent",
    outline:
      "bg-transparent hover:bg-surface text-text border border-input-border",
  };

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-2 rounded-lg cursor-pointer transition-all ${variantStyles[variant]} ${className}`}
    >
      {icon}
      {title && <>{title}</>}
    </button>
  );
};

export default Button;
