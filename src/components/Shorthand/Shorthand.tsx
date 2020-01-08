import * as React from 'react';
import { HandleChange } from '../../interfaces/index';

import { is } from '../../helper';
import StyledShorthand from './Shorthand.style';
import Label from '../Label/Label';

export interface Props {
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

const Shorthand: React.FC<Props> = ({
  label,
  description,
  value,
  onChange,
  iconBefore
}) => {
  if (!is.object(value) && !is.shorthand(value)) {
    throw Error(
      'Value of shorthand component must be an object with the following keys: { top: Number, right: Number, bottom: Number, left: Number }'
    );
  }

  const { top, left, right, bottom } = value;
  const updateValue = (key: string, val: number) => {
    const newValue = {
      ...value,
      [key]: val
    };

    onChange(newValue);
  };

  const handleChange = (event: HandleChange) => {
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
