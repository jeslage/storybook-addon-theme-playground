import React from 'react';

import StyledSelect from './Select.style';

export type SelectOptionValue = string | number;

export type SelectOption = {
  value: SelectOptionValue;
  label?: string;
};
export interface SelectProps {
  name?: string;
  onChange: (val: SelectOptionValue) => void;
  value: SelectOptionValue;
  options: SelectOption[];
}

const Select = ({ options, value, name, onChange }: SelectProps) => {
  const handleOnChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.currentTarget;
    const selectedOption = options[selectedIndex];
    onChange(selectedOption.value);
  };

  return (
    <StyledSelect>
      <select value={value} onChange={handleOnChange} name={name}>
        {options &&
          options.length > 0 &&
          options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label || option.value}
            </option>
          ))}
      </select>
      <div className="select__icon" />
    </StyledSelect>
  );
};

export default Select;
