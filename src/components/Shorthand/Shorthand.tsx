import React from 'react';

import StyledShorthand from './Shorthand.style';
import Label from '../Label/Label';

export interface ShorthandProps {
  iconBefore?: HTMLElement;
  label?: string;
  name?: string;
  description?: string;
  onChange: (val: ShorthandObject) => void;
  value: ShorthandObject;
}

interface ShorthandObject {
  top: number | string;
  left: number | string;
  right: number | string;
  bottom: number | string;
}

const Shorthand = ({
  label,
  description,
  value,
  onChange,
  iconBefore,
}: ShorthandProps) => {
  const { top, left, right, bottom } = value;

  const updateValue = (key: string, val: number) => {
    const newValue = {
      ...value,
      [key]: val,
    };

    onChange(newValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: eventValue, name } = event.target;

    if (eventValue !== '') {
      updateValue(name, parseFloat(eventValue));
    } else {
      updateValue(name, 0);
    }
  };

  return (
    <StyledShorthand>
      <Label iconBefore={iconBefore} label={label} description={description} />

      <div className="shorthand__shorthand">
        <input
          type="text"
          pattern="[0-9.]*"
          value={top}
          name="top"
          onChange={handleChange}
          onBlur={handleChange}
        />

        <input
          type="text"
          pattern="[0-9.]*"
          value={right}
          name="right"
          onChange={handleChange}
          onBlur={handleChange}
        />

        <input
          type="text"
          pattern="[0-9.]*"
          value={bottom}
          name="bottom"
          onChange={handleChange}
          onBlur={handleChange}
        />

        <input
          type="text"
          pattern="[0-9.]*"
          value={left}
          name="left"
          onChange={handleChange}
          onBlur={handleChange}
        />
      </div>
    </StyledShorthand>
  );
};

export default Shorthand;
