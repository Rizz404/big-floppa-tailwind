import { InputHTMLAttributes, forwardRef, useState, useEffect } from "react";
import { BiSearch, BiMinus, BiPlus } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "sm" | "md" | "xl";
  type?: "text" | "password" | "search" | "number";
  errorMessage?: string;
  label?: string;
}

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
    ref
  ) => {
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);
    const [numberValue, setNumberValue] = useState(
      props.value?.toString() || ""
    );

    const inputClassName = `input ${inputSize} ${errorMessage ? "error" : ""}`;
    const labelClassName = `label`;
    const errorMessageClassName = `error-message`;

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
      e: React.ChangeEvent<HTMLInputElement>
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
            <div className="input-container">
              <input
                type={isPasswordShowed ? "text" : "password"}
                className={`${inputClassName} has-icon-right`}
                ref={ref}
                {...props}
              />
              <button
                className="show-password-button"
                type="button"
                onClick={() => setIsPasswordShowed((prev) => !prev)}
              >
                {isPasswordShowed ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>
          );
        case "search":
          return (
            <div className="input-container">
              <BiSearch className="input-search-logo" />
              <input
                type="text"
                className={`${inputClassName} has-icon-left`}
                ref={ref}
                {...props}
              />
            </div>
          );
        case "number":
          return (
            <div className="input-container">
              <button
                className="number-button"
                type="button"
                onClick={() => handleNumberChange(-1)}
              >
                <BiMinus />
              </button>
              <input
                type="text"
                inputMode="numeric"
                pattern="-?\d*\.?\d*"
                className={`${inputClassName} has-icon-both`}
                ref={ref}
                value={numberValue}
                onChange={handleNumberInputChange}
                {...props}
              />
              <button
                className="number-button"
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
              className={inputClassName}
              ref={ref}
              onChange={onChange}
              {...props}
            />
          );
      }
    };

    return (
      <div className="textfield-container">
        {label && (
          <label htmlFor={id} className={labelClassName}>
            {label}
          </label>
        )}
        {renderInput()}
        {errorMessage && (
          <span className={errorMessageClassName}>{errorMessage}</span>
        )}
      </div>
    );
  }
);

export default TextField;
