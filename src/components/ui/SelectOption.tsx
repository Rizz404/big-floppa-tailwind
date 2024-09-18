import { SelectHTMLAttributes, forwardRef } from "react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectOptionProps extends SelectHTMLAttributes<HTMLSelectElement> {
  selectOptionSize?: "sm" | "md" | "xl";
  errorMessage?: string;
  label?: string;
  options: Option[];
  optionPlaceHolder?: string;
}

const SelectOption = forwardRef<HTMLSelectElement, SelectOptionProps>(
  (
    {
      selectOptionSize = "md",
      options,
      optionPlaceHolder,
      errorMessage,
      id,
      label,
      ...props
    },
    ref
  ) => {
    const selectOptionClassName = `select-option ${selectOptionSize} ${
      errorMessage ? "error" : ""
    }`;
    const labelClassName = `label`;
    const errorMessageClassName = `error-message`;

    return (
      <div className="textfield-container">
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
        <select
          id={id}
          ref={ref}
          className={selectOptionClassName}
          {...props}
          defaultValue=""
        >
          {optionPlaceHolder && (
            <option value="" disabled>
              {optionPlaceHolder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>{" "}
        <span className={errorMessageClassName}>{errorMessage}</span>
      </div>
    );
  }
);

export default SelectOption;
