import { forwardRef } from "react";
import clx from "clsx";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  label?: string;
  errorMessage?: string;
  containerClassName?: string;
  optionClassName?: string;
}

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      options,
      selectedValues,
      onChange,
      label,
      errorMessage,
      containerClassName,
      optionClassName,
    },
    ref,
  ) => {
    const handleCheckboxChange = (value: string) => {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((v) => v !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    };

    return (
      <div ref={ref}>
        {label && <label className="mb-1 block font-medium">{label}</label>}
        <div className={clx("space-y-2", containerClassName)}>
          {options.map((option) => (
            <label
              key={option.value}
              className={clx(
                "flex cursor-pointer items-center space-x-2",
                optionClassName,
              )}
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                className="form-checkbox h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {errorMessage && (
          <span className="mt-1 block text-sm text-red-500">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

export default CheckboxGroup;
