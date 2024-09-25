import { InputHTMLAttributes, forwardRef, useState, useEffect } from "react";
import { BiSearch, BiMinus, BiPlus } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";

type InputSize = "sm" | "md" | "xl";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize;
  type?: "text" | "password" | "search" | "number";
  errorMessage?: string;
  label?: string;
}

const inputSizeStyles = {
  sm: "text-sm py-1 px-2",
  md: "text-base py-2 px-3",
  xl: "text-lg py-3 px-4",
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      inputSize = "md",
      type = "text",
      errorMessage,
      id,
      label,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);
    const [numberValue, setNumberValue] = useState(
      props.value?.toString() || "",
    );

    const styles = {
      inputStyle: ` w-full rounded border ${inputSizeStyles[inputSize]} focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder:text-md ${errorMessage ? "border-red-500" : "border-gray-500"}`,
    };

    useEffect(() => {
      if (type === "number" && props.value !== undefined) {
        setNumberValue(props.value.toString());
      }
    }, [props.value, type]);

    const handleNumberChange = (change: number) => {
      const currentValue = Number(numberValue) || 0;
      const newValue = currentValue + change;
      updateNumberValue(newValue.toString());
    };

    const updateNumberValue = (value: string) => {
      setNumberValue(value);
      if (onChange) {
        const event = {
          target: { value, name: props.name },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const handleNumberInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const value = e.target.value;
      if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
        updateNumberValue(value);
      }
    };

    const renderInput = () => {
      switch (type) {
        case "password":
          return (
            <div className="relative">
              <input
                type={isPasswordShowed ? "text" : "password"}
                className={`${styles.inputStyle} pr-10`}
                ref={ref}
                {...props}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                type="button"
                onClick={() => setIsPasswordShowed((prev) => !prev)}
              >
                {isPasswordShowed ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>
          );
        case "search":
          return (
            <div className="relative">
              <BiSearch className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                className={`${styles.inputStyle} pl-10`}
                ref={ref}
                {...props}
              />
            </div>
          );
        case "number":
          return (
            <div className="flex items-center">
              <button
                className="rounded-l bg-gray-200 p-2 hover:bg-gray-300"
                type="button"
                onClick={() => handleNumberChange(-1)}
              >
                <BiMinus />
              </button>
              <input
                type="text"
                inputMode="numeric"
                pattern="-?\d*\.?\d*"
                className={`${styles.inputStyle} text-center`}
                ref={ref}
                value={numberValue}
                onChange={handleNumberInputChange}
                {...props}
              />
              <button
                className="rounded-r bg-gray-200 p-2 hover:bg-gray-300"
                type="button"
                onClick={() => handleNumberChange(1)}
              >
                <BiPlus />
              </button>
            </div>
          );
        default:
          return (
            <input
              type={type}
              className={styles.inputStyle}
              ref={ref}
              onChange={onChange}
              {...props}
            />
          );
      }
    };

    return (
      <div>
        {label && (
          <label htmlFor={id} className="mb-1 block font-medium">
            {label}
          </label>
        )}
        {renderInput()}
        {errorMessage && (
          <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
        )}
      </div>
    );
  },
);

export default TextField;
