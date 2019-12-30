import * as React from "react";

import StyledInput from "./Input.style";

export interface Props {
  label?: string;
  onChange: (val: string) => void;
  value?: string;
}

const Input: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <StyledInput>
      {label && <p>{label}</p>}

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
