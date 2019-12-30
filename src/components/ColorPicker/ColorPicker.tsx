import * as React from 'react';
import { ChromePicker } from 'react-color';

import StyledColorPicker from './ColorPicker.style';

export interface Props {
  iconBefore?: HTMLElement;
  label: string;
  onChange: (hex: string) => void;
  title?: string;
  value: string;
}

const ColorPicker: React.FC<Props> = ({
  iconBefore,
  title,
  label,
  onChange,
  value
}) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <StyledColorPicker>
      {(label || iconBefore) && (
        <p className="colorPicker__label" title={title}>
          {iconBefore}
          {label && label}
        </p>
      )}
      <div className="colorPicker__wrapper">
        <button
          type="button"
          onClick={() => setVisible(prev => !prev)}
          aria-label="Open color picker"
          className="colorPicker__open"
        >
          <span style={{ background: value }} />
        </button>

        {visible && (
          <>
            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label="Close color picker"
              className="colorPicker__cover"
            />
            <div className="colorPicker__content">
              <ChromePicker
                disableAlpha
                color={value}
                onChangeComplete={color => {
                  if (onChange) onChange(color.hex);
                }}
              />
            </div>
          </>
        )}
      </div>
    </StyledColorPicker>
  );
};

export default ColorPicker;
