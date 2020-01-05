import * as React from 'react';
import { HandleChange } from '../../interfaces/index';

import StyledRange from './Range.style';
import Label from '../Label/Label';

export interface Props {
  iconBefore?: HTMLElement;
  label?: string;
  onChange: (val: number) => void;
  value: number;
  min?: number;
  max?: number;
  steps?: number;
  suffix?: string;
  description?: string;
}

const Range: React.FC<Props> = ({
  iconBefore,
  value,
  label,
  onChange,
  min = 0,
  max = 100,
  steps = 1,
  description,
  suffix
}) => {
  const updateValue = (val: number) => {
    if (onChange) onChange(val);
  };

  const handleChange = (event: HandleChange) => {
    const { value: eventValue, validity } = event.target;

    if (validity.valid) {
      if (eventValue !== '') {
        updateValue(parseFloat(eventValue));
      } else {
        updateValue(0);
      }
    }
  };

  const handleBlur = (event: HandleChange) => {
    const { value: eventValue } = event.target;
    const numberValue = parseFloat(eventValue);

    if (numberValue > max) {
      updateValue(max);
    } else if (numberValue < min) {
      updateValue(min);
    }
  };

  return (
    <StyledRange htmlFor={label}>
      <Label iconBefore={iconBefore} label={label} description={description} />

      <span>
        <input
          type="text"
          pattern="[0-9.]*"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {suffix}
      </span>

      <input
        type="range"
        step={steps}
        min={min}
        max={max}
        value={value}
        onChange={e => updateValue(parseFloat(e.target.value))}
      />
    </StyledRange>
  );
};

export default Range;
