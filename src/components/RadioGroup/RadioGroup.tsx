import React from 'react';

import StyledRadioGroup from './RadioGroup.style';
import RadioOption from '../RadioOption/RadioOption';

export type RadioOption = {
  label: string;
  value: string;
};
export interface RadioGroupProps {
  onChange: (val: string) => void;
  value: string;
  name: string;
  options: RadioOption[];
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <StyledRadioGroup>
      {options &&
        options.map((item) => (
          <RadioOption
            key={item.value}
            label={item.label}
            value={item.value}
            name={name}
            onChange={() => onChange(item.value)}
            isChecked={value === item.value}
          />
        ))}
    </StyledRadioGroup>
  );
};

export default RadioGroup;
