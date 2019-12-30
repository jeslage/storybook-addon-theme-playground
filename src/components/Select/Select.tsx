import * as React from 'react';

import StyledSelect from './Select.style';

export interface Props {
  iconBefore?: HTMLElement;
  label?: string;
  title?: string;
  name?: string;
  onChange: (val: string) => void;
  initialValue: string;
  options: Array<Option>;
}

export interface Option {
  value: string;
  label?: string;
}

const Select: React.FC<Props> = ({
  options,
  iconBefore,
  initialValue,
  label,
  title,
  name,
  onChange,
  ...props
}) => {
  const [currentValue, setCurrentValue] = React.useState(initialValue);

  React.useEffect(() => {
    setCurrentValue(initialValue);
  }, [initialValue]);

  return (
    <StyledSelect {...props}>
      <label htmlFor={label}>
        {(label || iconBefore) && (
          <p className="select__label" title={title}>
            {iconBefore}
            {label && label}
          </p>
        )}
        <select
          value={currentValue}
          onChange={event => {
            const { value } = event.target;

            setCurrentValue(value);

            if (onChange) {
              onChange(value);
            }
          }}
          name={name}
        >
          {options.map(option => (
            <option value={option.value} key={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </select>
        <div className="select__icon" />
      </label>
    </StyledSelect>
  );
};

export default Select;
