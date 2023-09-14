import React from 'react';
import { styled } from '@storybook/theming';
import { NumberControl } from '@storybook/blocks';

type ShorthandProps = {
  name?: string;
  onChange: (val: ShorthandObject) => void;
  value: ShorthandObject;
};

type ShorthandObject = {
  top: number | string;
  left: number | string;
  right: number | string;
  bottom: number | string;
};

const StyledShorthand = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;

  input {
    display: inline-block;
    max-width: 55px;
    margin-right: 5px;
  }
`;

const Shorthand = ({ value, onChange }: ShorthandProps) => {
  const { top, left, right, bottom } = value;

  const updateValue = (key: string, val: number) => {
    const newValue = {
      ...value,
      [key]: val
    };

    onChange(newValue);
  };

  const handleChange = (name: string, val: number | null) => {
    if (val) {
      updateValue(name, val);
    } else {
      updateValue(name, 0);
    }
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: eventValue, name } = event.target;
    handleChange(name, parseFloat(eventValue));
  };

  return (
    <StyledShorthand>
      <NumberControl
        value={parseInt(top as any)}
        name="top"
        onChange={(v) => handleChange('top', v)}
        onBlur={handleBlur}
      />

      <NumberControl
        value={parseInt(right as any)}
        name="right"
        onChange={(v) => handleChange('right', v)}
        onBlur={handleBlur}
      />

      <NumberControl
        value={parseInt(bottom as any)}
        name="bottom"
        onChange={(v) => handleChange('bottom', v)}
        onBlur={handleBlur}
      />

      <NumberControl
        value={parseInt(left as any)}
        name="left"
        onChange={(v) => handleChange('left', v)}
        onBlur={handleBlur}
      />
    </StyledShorthand>
  );
};

export default Shorthand;
