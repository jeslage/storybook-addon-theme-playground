import React from 'react';

import StyledInput from './Input.style';

export interface Props {
  onChange: (val: string) => void;
  value?: string;
}

const Input: React.FC<Props> = ({ value, onChange }) => {
  return (
    <StyledInput
      type="text"
      value={value}
      onChange={(event) => {
        const { value: eventValue } = event.target;
        onChange(eventValue);
      }}
    />
  );
};

export default Input;
