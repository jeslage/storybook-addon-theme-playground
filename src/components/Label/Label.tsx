import React from 'react';
import { Icons } from '@storybook/components/dist/icon/icon';
import { IconKey } from '@storybook/components/dist/icon/icons';

import StyledLabel from './Label.style';

export interface Props {
  icon?: IconKey;
  label?: string;
  description?: string;
}

const Label: React.FC<Props> = ({ label, icon, description }) => {
  return (
    <StyledLabel>
      {(label || icon) && (
        <p className="label">
          {icon && <Icons icon={icon} />}
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
