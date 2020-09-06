import React, { useState, useRef, useEffect } from 'react';
import { ChromePicker } from 'react-color';

import StyledColorPicker from './ColorPicker.style';
import Label from '../Label/Label';

export interface ColorPickerProps {
  iconBefore?: HTMLElement;
  description?: string;
  label: string;
  onChange: (hex: string) => void;
  value: string;
}

const ColorPicker = ({
  iconBefore,
  description,
  label,
  onChange,
  value,
}: ColorPickerProps) => {
  const [visible, setVisible] = useState(false);
  const content = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e) => {
    if (content.current && !content.current.contains(e.target) && visible)
      setVisible(false);
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [event, handleOutsideClick]);

  const handleChange = ({ hex, rgb }) => {
    if (onChange) {
      let newColor = hex;

      if (rgb.a < 1) {
        newColor = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
      }

      onChange(newColor);
    }
  };
  return (
    <StyledColorPicker>
      <Label iconBefore={iconBefore} label={label} description={description} />

      <div className="colorPicker__wrapper">
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
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
            <div className="colorPicker__content" ref={content}>
              <ChromePicker color={value} onChangeComplete={handleChange} />
            </div>
          </>
        )}
      </div>
    </StyledColorPicker>
  );
};

export default ColorPicker;
