interface ButtonProps {
  onClick?: () => void;
  title?: string;
  iconStyle?: string;
  className?: string;
  ariaLabel: string;
}
const Button: React.FC<ButtonProps> = ({
  onClick,
  title,
  iconStyle,
  className = "",
  ariaLabel,
}) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer bg-surface-3 hover:bg-surface-2 transition-all hover:text-on-surface text-text border border-surface ${className}`}
    >
      {iconStyle && <i className={`flex ${iconStyle}`} />}

      {title && <>{title}</>}
    </button>
  );
};

export default Button;
