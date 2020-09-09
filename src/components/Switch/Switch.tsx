import React from 'react';

import StyledSwitch from './Switch.style';

export interface Props {
  onChange: (val: boolean) => void;
  value: boolean;
}

const Switch: React.FC<Props> = ({ onChange, value }) => (
  <StyledSwitch
    active={value}
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
  </StyledSwitch>
);

export default Switch;
