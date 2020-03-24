import * as React from 'react';

import Label from '../Label/Label';
import StyledSelect from './Select.style';

type OptionValue = string | number;

type Option<T extends OptionValue> = {
  value: T;
  label?: string;
};
export interface SelectProps<T extends OptionValue> {
  iconBefore?: HTMLElement;
  label?: string;
  description?: string;
  name?: string;
  onChange: (val: T) => void;
  value: T;
  options: Option<T>[];
}

function Select<T extends OptionValue>(props: SelectProps<T>) {
  const {
    options,
    iconBefore,
    value,
    label,
    description,
    name,
    onChange,
  } = props;

  function handleOnChange(e: React.FormEvent<HTMLSelectElement>) {
    const { selectedIndex } = e.currentTarget;
    const selectedOption = options[selectedIndex];
    onChange(selectedOption.value);
  }

  return (
    <StyledSelect htmlFor={label}>
      <Label iconBefore={iconBefore} label={label} description={description} />

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
