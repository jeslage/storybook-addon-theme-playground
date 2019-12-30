import * as React from 'react';

import StyledTextarea from './Textarea.style';

export interface Props {
  label?: string;
  onChange: (val: string) => void;
  value: string;
}

const Textarea: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <StyledTextarea>
      {label && <p>{label}</p>}
      <textarea
        rows={10}
        value={value}
        onChange={event => onChange(event.target.value)}
      />
    </StyledTextarea>
  );
};

export default Textarea;
