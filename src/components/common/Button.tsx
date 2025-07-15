interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  title?: string;
  iconStyle?: string;
  className?: string;
  ariaLabel: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "error" | "ghost";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  title,
  iconStyle,
  className = "",
  type = "button",
  ariaLabel,
  variant = "primary",
}) => {
  const variantStyles = {
    primary:
      "bg-surface-3 hover:bg-surface-2 text-on-surface text-text border-surface",
    secondary:
      "outline-2 outline-surface-3 hover:border-surface-3 hover:bg-surface-2",
    error: "",
    ghost: "bg-surface hover:bg-surface-1",
  };

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-2 rounded-lg cursor-pointer transition-all ${variantStyles[variant]} ${className}`}
    >
      {iconStyle && <i className={`flex ${iconStyle}`} />}
      {title && <>{title}</>}
    </button>
  );
};

export default Button;
