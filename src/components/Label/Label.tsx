import React from 'react';

import StyledLabel from './Label.style';

export interface Props {
  iconBefore?: HTMLElement;
  label?: string;
  description?: string;
}

const Label: React.FC<Props> = ({ label, iconBefore, description }) => {
  return (
    <StyledLabel>
      {(label || iconBefore) && (
        <p className="label">
          {iconBefore}
          {label && label}
        </p>
      )}
      {description && (
        <p className="description">
          <small>{description}</small>
        </p>
      )}
    </StyledLabel>
  );
};

export default Label;
