import * as React from 'react';

import StyledRadioGroup from './RadioGroup.style';
import RadioOption from '../RadioOption/RadioOption';
import Label from '../Label/Label';

type RadioOptions = {
  label: string;
  value: string;
};
export interface RadioGroupProps {
  iconBefore?: HTMLElement;
  label: string;
  description?: string;
  onChange: (val: string) => void;
  value: string;
  name: string;
  options: RadioOptions[];
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  description,
  iconBefore,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <StyledRadioGroup>
      <Label iconBefore={iconBefore} label={label} description={description} />

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
