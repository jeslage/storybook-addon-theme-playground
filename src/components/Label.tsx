import React from 'react';
import { styled } from '@storybook/theming';

import { Icons, IconsProps } from '@storybook/components';

const StyledLabel = styled.div`
  flex-grow: 2;
  padding-right: 20px;

  .label {
    margin: 0;
    display: flex;
    font-size: 13px;
    line-height: 20px;
    align-items: center;
    hyphens: auto;

    svg {
      width: 15px;
      height: auto;
      margin-right: 5px;
    }
  }

  .description {
    margin: 0;
    margin-top: 0.35rem;
    font-size: 13px;
    line-height: 20px;
    color: ${(props) => props.theme.color.dark};
  }
`;

type LabelProps = {
  icon?: IconsProps['icon'];
  label?: string;
  description?: string;
};

const Label = ({ label, icon, description }: LabelProps) => {
  return (
    <StyledLabel>
      {(label || icon) && (
        <p className="label">
          {icon && <Icons icon={icon} />}
          {label && label}
        </p>
      )}
      {description && <p className="description">{description}</p>}
    </StyledLabel>
  );
};

export default Label;
