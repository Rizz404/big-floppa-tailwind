import { ButtonHTMLAttributes, forwardRef } from "react";

type variant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: variant;
  size?: "sm" | "md" | "xl";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, ...props }, ref) => {
    const className = `btn btn-${variant} ${size}`;

    return (
      <button ref={ref} className={className} {...props}>
        {children}
      </button>
    );
  }
);

export default Button;
