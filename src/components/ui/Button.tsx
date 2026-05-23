interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset"; // <--- أضف هذا السطر هنا
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  style,
  type = "button", // <--- استقبله هنا واعطيه قيمة افتراضية
}: ButtonProps) => {
  const baseStyles =
    "px-8 py-3 rounded-lg font-bold font-montserrat transition-all duration-300 text-sm md:text-base text-center";

  const variants = {
    primary:
      "bg-[#C9A962] text-[#2B2B2B] hover:bg-[#b39552] active:scale-95 shadow-md",
    secondary: "bg-[#8B1538] text-white hover:bg-[#6B0F2C] active:scale-95",
    outline:
      "border-2 border-white text-white hover:bg-white/10 active:scale-95",
  };

  return (
    <button
      type={type} // <--- مرره هنا للزر الحقيقي
      onClick={onClick}
      style={style}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
