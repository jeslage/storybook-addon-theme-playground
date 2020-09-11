import React from 'react';

import StyledShorthand from './Shorthand.style';

export interface ShorthandProps {
  name?: string;
  onChange: (val: ShorthandObject) => void;
  value: ShorthandObject;
}

interface ShorthandObject {
  top: number | string;
  left: number | string;
  right: number | string;
  bottom: number | string;
}

const Shorthand = ({ value, onChange }: ShorthandProps) => {
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
      <input
        type="number"
        value={top}
        name="top"
        onChange={handleChange}
        onBlur={handleChange}
      />

      <input
        type="number"
        value={right}
        name="right"
        onChange={handleChange}
        onBlur={handleChange}
      />

      <input
        type="number"
        value={bottom}
        name="bottom"
        onChange={handleChange}
        onBlur={handleChange}
      />

      <input
        type="number"
        value={left}
        name="left"
        onChange={handleChange}
        onBlur={handleChange}
      />
    </StyledShorthand>
  );
};

export default Shorthand;
