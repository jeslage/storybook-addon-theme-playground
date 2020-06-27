import * as React from 'react';

import StyledTextarea from './Textarea.style';
import Label from '../Label/Label';

export interface Props {
  label: string;
  iconBefore?: HTMLElement;
  description?: string;
  onChange: (val: string) => void;
  value: string;
}

const Textarea: React.FC<Props> = ({
  label,
  iconBefore,
  description,
  value,
  onChange,
}) => {
  return (
    <StyledTextarea>
      <Label iconBefore={iconBefore} label={label} description={description} />

      <textarea
        rows={10}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </StyledTextarea>
  );
};

export default Textarea;
