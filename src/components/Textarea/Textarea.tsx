import React from 'react';
import StyledTextarea from './Textarea.style';

export interface TextareaProps {
  onChange: (val: string) => void;
  value: string;
}

const Textarea = ({ value, onChange }: TextareaProps) => (
  <StyledTextarea
    rows={10}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  />
);

export default Textarea;
