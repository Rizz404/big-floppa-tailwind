import { ButtonHTMLAttributes, forwardRef } from "react";

type variant = "contained" | "outlined";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: variant;
  size?: "sm" | "md" | "xl";
}

const buttonVariantStyles = {
  contained: "bg-orange-500 text-white",
  outlined: "border-orange-500 text-orange-500",
};

const buttonSizeStyles = {
  sm: "text-sm py-1 px-2",
  md: "text-base py-2 px-3",
  xl: "text-lg py-3 px-4",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "contained", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`rounded ${buttonVariantStyles[variant]} ${buttonSizeStyles[size]} transition duration-300 ease-in-out hover:bg-orange-600 disabled:opacity-50`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export default Button;
