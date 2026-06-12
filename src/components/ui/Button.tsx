interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  style,
  type = "button",
  disabled,
}: ButtonProps) => {
  const base =
    "px-7 py-3 rounded-lg font-body font-semibold transition-all duration-200 text-[14px] text-center inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  const variants = {
    primary: "bg-gold-500 text-neutral-900 hover:bg-gold-400 shadow-sm",
    secondary: "bg-burgundy-700 text-white hover:bg-burgundy-800",
    outline:
      "border-2 border-burgundy-700 text-burgundy-700 hover:bg-burgundy-700 hover:text-white",
    ghost: "text-burgundy-700 hover:bg-burgundy-50",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
