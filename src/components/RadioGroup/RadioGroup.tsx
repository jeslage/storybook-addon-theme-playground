import * as React from "react";

import StyledRadioGroup from "./RadioGroup.style";

export interface Props {
  iconBefore?: HTMLElement;
  label?: string;
  onChange: (val: string) => void;
  value: string;
  name: string;
  options: [Option];
}

interface Option {
  value: string;
  label?: string;
  icon?: HTMLElement;
}

const RadioGroup: React.FC<Props> = ({
  label,
  iconBefore,
  name,
  value,
  onChange,
  options
}) => {
  return (
    <StyledRadioGroup>
      {(label || iconBefore) && (
        <p className="radioGroup__label">
          {iconBefore}
          {label && label}
        </p>
      )}
      {options.map(option => (
        <label key={option.value} className="radioGroup__radio" htmlFor={name}>
          <input
            type="radio"
            id={name}
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={e => onChange(e.target.value)}
          />
          {option.icon && <div className="radioGroup__icon">{option.icon}</div>}
        </label>
      ))}
    </StyledRadioGroup>
  );
};

export default RadioGroup;
