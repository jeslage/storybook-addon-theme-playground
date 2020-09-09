import React from 'react';

import Label from '../Label/Label';
import StyledSelect from './Select.style';

export type SelectOptionValue = string | number;

export type SelectOption = {
  value: SelectOptionValue;
  label?: string;
};
export interface SelectProps {
  icon?: HTMLElement;
  label?: string;
  description?: string;
  name?: string;
  onChange: (val: SelectOptionValue) => void;
  value: SelectOptionValue;
  options: SelectOption[];
}

function Select(props: SelectProps) {
  const { options, icon, value, label, description, name, onChange } = props;

  function handleOnChange(e: React.FormEvent<HTMLSelectElement>) {
    const { selectedIndex } = e.currentTarget;
    const selectedOption = options[selectedIndex];
    onChange(selectedOption.value);
  }

  return (
    <StyledSelect htmlFor={label}>
      <Label icon={icon} label={label} description={description} />

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
}

export default Select;
