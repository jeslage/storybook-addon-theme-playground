import * as React from 'react';

import StyledRadioGroup from './RadioGroup.style';
import RadioOption, { RadioOptionProps } from '../RadioOption/RadioOption';
export interface Props {
  iconBefore?: HTMLElement;
  label?: string;
  onChange: (val: string) => void;
  value: string;
  name: string;
}

const RadioGroup: React.FC<Props> = ({
  label,
  iconBefore,
  name,
  value,
  onChange,
  children
}) => {
  return (
    <StyledRadioGroup>
      {(label || iconBefore) && (
        <p className="radioGroup__label">
          {iconBefore}
          {label && label}
        </p>
      )}
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
