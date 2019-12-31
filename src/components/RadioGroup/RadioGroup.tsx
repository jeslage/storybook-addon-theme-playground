import * as React from 'react';

import StyledRadioGroup from './RadioGroup.style';
import RadioOption, { RadioOptionProps } from '../RadioOption/RadioOption';
import Label from '../Label/Label';
export interface Props {
  iconBefore?: HTMLElement;
  label: string;
  description?: string;
  onChange: (val: string) => void;
  value: string;
  name: string;
}

const RadioGroup: React.FC<Props> = ({
  label,
  description,
  iconBefore,
  name,
  value,
  onChange,
  children
}) => {
  return (
    <StyledRadioGroup>
      <Label iconBefore={iconBefore} label={label} description={description} />

      {React.Children.map(
        children,
        (child: React.ReactElement<RadioOptionProps>) => {
          if (child.type !== RadioOption) return;
          return React.cloneElement(child, {
            onChange,
            name,
            label: child.props.label,
            value: child.props.value,
            icon: child.props.icon,
            isChecked: child.props.value === value
          });
        }
      )}
    </StyledRadioGroup>
  );
};

export default RadioGroup;
