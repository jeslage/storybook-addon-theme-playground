import React, { useState, useRef, useEffect } from 'react';
import ColorPicker from 'react-pick-color';

import StyledColorPicker from './ColorPicker.style';

export interface ColorPickerProps {
  onChange: (hex: string) => void;
  value: string;
}

const ColorPick = ({ onChange, value }: ColorPickerProps) => {
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
        newColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
      }

      onChange(newColor);
    }
  };
  return (
    <StyledColorPicker>
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        aria-label="Open color picker"
        className="colorPicker__open"
      >
        {value}
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
          <div className="colorPicker__content a" ref={content}>
            <ColorPicker color={value} onChange={handleChange} />
          </div>
        </>
      )}
    </StyledColorPicker>
  );
};

export default ColorPick;
