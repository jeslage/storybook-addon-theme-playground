import React from 'react';

import StyledRadioOption from './RadioOption.style';

export interface RadioOptionProps {
  onChange?: (val: string) => void;
  name?: string;
  value: string;
  label: string;
  isChecked?: boolean;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  name,
  value,
  onChange,
  isChecked,
}) => {
  return (
    <StyledRadioOption htmlFor={value}>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={isChecked}
        onChange={({ target }) => {
          if (onChange) {
            onChange((target as HTMLInputElement).value);
          }
        }}
      />
      <div>{label || value}</div>
    </StyledRadioOption>
  );
};

export default RadioOption;
