import * as React from 'react';
import { HandleChange } from '../../interfaces/index';

import StyledRange from './Range.style';

export interface Props {
  iconBefore?: HTMLElement;
  label?: string;
  title?: string;
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
  title,
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
    <StyledRange>
      <label htmlFor={label}>
        <div className="range__text">
          {(label || iconBefore) && (
            <p className="range__label" title={title}>
              {iconBefore}
              {label && label}
            </p>
          )}
          {description && (
            <p className="range__description">
              <small>{description}</small>
            </p>
          )}
        </div>

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
      </label>
    </StyledRange>
  );
};

export default Range;
