import * as React from 'react';

import StyledInput from './Input.style';
import Label from '../Label/Label';

export interface Props {
  label: string;
  description?: string;
  iconBefore?: HTMLElement;
  onChange: (val: string) => void;
  value?: string;
}

const Input: React.FC<Props> = ({
  label,
  iconBefore,
  description,
  value,
  onChange
}) => {
  return (
    <StyledInput>
      <Label iconBefore={iconBefore} label={label} description={description} />

      <input
        type="text"
        value={value}
        onChange={event => {
          const { value: eventValue } = event.target;
          onChange(eventValue);
        }}
      />
    </StyledInput>
  );
};

export default Input;
