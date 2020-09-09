import React from 'react';

import StyledRange from './Range.style';

export interface Props {
  icon?: HTMLElement;
  label?: string;
  onChange: (val: number, suffix: string | undefined) => void;
  value: number;
  min?: number;
  max?: number;
  steps?: number;
  suffix?: string | undefined;
  description?: string;
}

const Range: React.FC<Props> = ({
  value,
  label,
  onChange,
  min = 0,
  max = 100,
  steps = 1,
  suffix,
}) => {
  const updateValue = (val: number) => {
    if (onChange) onChange(val, suffix);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: eventValue } = event.target;

    if (eventValue !== '') {
      updateValue(parseFloat(eventValue));
    } else {
      updateValue(0);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
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
      <span>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          step={steps}
          min={min}
          max={max}
        />
        {suffix}
      </span>

      <input
        type="range"
        step={steps}
        min={min}
        max={max}
        value={value}
        onChange={(e) => updateValue(parseFloat(e.target.value))}
      />
    </StyledRange>
  );
};

export default Range;
