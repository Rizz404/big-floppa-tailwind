import { InputHTMLAttributes, forwardRef } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "sm" | "md" | "xl";
  type?: "text" | "password";
  errorMessage?: string;
  label?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { inputSize = "md", type = "text", errorMessage, id, label, ...props },
    ref
  ) => {
    const inputClassName = `input ${inputSize} ${errorMessage ? "error" : ""}`;
    const labelClassName = `label`;
    const errorMessageClassName = `error-message`;

    return (
      <div className="textfield-container">
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
        <input type={type} className={inputClassName} ref={ref} {...props} />
        <span className={errorMessageClassName}>{errorMessage}</span>
      </div>
    );
  }
);

export default TextField;
