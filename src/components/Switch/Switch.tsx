import * as React from 'react';

import StyledSwitch from './Switch.style';
import Label from '../Label/Label';

export interface Props {
  iconBefore?: HTMLElement;
  label?: string;
  description?: string;
  onChange: (val: boolean) => void;
  value: boolean;
}

const Switch: React.FC<Props> = ({
  iconBefore,
  label,
  onChange,
  description,
  value
}) => (
  <StyledSwitch active={value}>
    <Label iconBefore={iconBefore} label={label} description={description} />

    <button
      onClick={() => {
        if (onChange) onChange(!value);
      }}
      type="button"
      role="switch"
      aria-checked={value}
    >
      <span>
        {!value ? (
          <svg
            viewBox="0 0 52 52"
            focusable="false"
            aria-hidden="true"
            role="presentation"
          >
            <path d="m19.1 19.1 l14 14 m 0 -14 l -14 14" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 52 52"
            focusable="false"
            aria-hidden="true"
            role="presentation"
          >
            <path d="m19.1 25.2 4.7 6.2 12.1-11.2" />
          </svg>
        )}
      </span>
    </button>
  </StyledSwitch>
);

export default Switch;
