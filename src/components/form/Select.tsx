import React from "react";
import SelectBase, { StylesConfig } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Chọn một mục",
  onChange,
  value,
  defaultValue,
  disabled = false,
  className = "",
}) => {
  const selectedOption = options.find(
    (opt) => opt.value === (value ?? defaultValue)
  );

  // custom style
  const customStyles: StylesConfig<Option, false> = {
    control: (provided) => ({
      ...provided,
      minHeight: "44px",
      height: "44px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "44px",
      padding: "0 8px",
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "44px",
    }),
  };

  return (
    <SelectBase
      options={options}
      placeholder={placeholder}
      isDisabled={disabled}
      isSearchable={true}
      onChange={(selected) => selected && onChange((selected as Option).value)}
      value={selectedOption}
      className={className}
      classNamePrefix="custom-select"
      menuPlacement="auto"
      closeMenuOnSelect={true}
      filterOption={(option, input) =>
        option.label.toLowerCase().includes(input.toLowerCase())
      }
      styles={customStyles}
    />
  );
};

export default Select;
