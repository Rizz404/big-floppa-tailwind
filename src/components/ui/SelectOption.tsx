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

const selectOptionSizeStyles = {
  sm: "text-sm py-1 px-2",
  md: "text-base py-2 px-3",
  xl: "text-lg py-3 px-4",
};

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
    ref,
  ) => {
    return (
      <div>
        <label htmlFor={id} className="mb-1 block font-medium">
          {label}
        </label>
        <select
          id={id}
          ref={ref}
          className={`w-full focus:outline-none focus:ring-2 ${selectOptionSizeStyles[selectOptionSize]} rounded border ${errorMessage ? "border-red-500" : "border-gray-500"}`}
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
        </select>
        <span className="text-xs text-red-500">{errorMessage}</span>
      </div>
    );
  },
);

export default SelectOption;
