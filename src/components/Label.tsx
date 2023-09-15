import React from "react";
import { styled } from "@storybook/theming";

import { Icons, IconsProps } from "@storybook/components";

const LabelWrapper = styled.div`
  flex-grow: 2;
  padding-right: 20px;
`;

const LabelContent = styled.p`
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
`;

const LabelDescription = styled.p`
  margin: 0;
  margin-top: 0.35rem;
  font-size: 13px;
  line-height: 20px;
  color: ${(props) => props.theme.color.dark};
`;

type LabelProps = {
  icon?: IconsProps["icon"];
  label?: string;
  description?: string;
};

const Label = ({ label, icon, description }: LabelProps) => (
  <LabelWrapper>
    {(label || icon) && (
      <LabelContent>
        {icon && <Icons icon={icon} />}
        {label && label}
      </LabelContent>
    )}

    {description && <LabelDescription>{description}</LabelDescription>}
  </LabelWrapper>
);

export default Label;
