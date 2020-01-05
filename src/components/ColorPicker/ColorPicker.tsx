import * as React from 'react';
import { ChromePicker } from 'react-color';

import StyledColorPicker from './ColorPicker.style';
import Label from '../Label/Label';

export interface Props {
  iconBefore?: HTMLElement;
  description?: string;
  label: string;
  onChange: (hex: string) => void;
  value: string;
}

const ColorPicker: React.FC<Props> = ({
  iconBefore,
  description,
  label,
  onChange,
  value
}) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <StyledColorPicker>
      <Label iconBefore={iconBefore} label={label} description={description} />

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
