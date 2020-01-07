import * as React from 'react';

import { SettingsContext } from '../../contexts/SettingsProvider';

import { getLabel } from '../../helper';

import Counter from '../Counter/Counter';
import Colorpicker from '../ColorPicker/ColorPicker';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import Switch from '../Switch/Switch';
import Range from '../Range/Range';
import Shorthand from '../Shorthand/Shorthand';

import { StyledSettingsItem } from './SettingsItem.style';

interface ComponentProps {
  type: string;
  path: string;
  props: { label: string; value: any };
  overrideProps: any;
  update: (path: string, value: any) => void;
}

const unitMatch = (value: any) =>
  value.toString().match(/^(\d+(?:\.\d+)?)(.*)$/);

const Component: React.FC<ComponentProps> = ({
  type,
  path,
  overrideProps,
  props,
  update
}) => {
  const { value, label } = props;
  const unit = unitMatch(value);

  if (overrideProps && overrideProps.hidden) return null;

  switch (type) {
    case 'colorpicker':
      return (
        <Colorpicker
          label={label}
          value={value}
          onChange={val => update(path, val)}
          {...overrideProps}
        />
      );
    case 'counter':
      return (
        <Counter
          label={label}
          suffix={unit && unit[2]}
          value={parseFloat(unit[1])}
          onChange={val => update(path, val)}
          {...overrideProps}
        />
      );
    case 'range':
      return (
        <Range
          label={props.label}
          suffix={unit && unit[2]}
          value={parseFloat(unit[1])}
          onChange={val => update(path, `${val}${unit[2]}`)}
          {...overrideProps}
        />
      );
    case 'input':
      return (
        <Input
          label={label}
          value={value}
          onChange={val => update(path, val)}
          {...overrideProps}
        />
      );
    case 'shorthand':
      return (
        <Shorthand
          label={label}
          value={value}
          onChange={val => update(path, val)}
          {...overrideProps}
        />
      );
    case 'switch':
      return (
        <Switch
          label={label}
          value={value}
          onChange={val => update(path, val)}
          {...overrideProps}
        />
      );
    case 'textarea':
      return (
        <Textarea
          label={label}
          value={value}
          onChange={val => update(path, val)}
          {...overrideProps}
        />
      );
    default:
      return null;
  }
};

function areEqual(prev, next) {
  return prev.props.value === next.props.value;
}

export const MemoizedComponent = React.memo(Component, areEqual);

const SettingsItem = () => {
  const {
    updateTheme,
    overrides,
    config,
    themeComponents,
    activeTheme: { name }
  } = React.useContext(SettingsContext);

  const activeComponents = themeComponents[name] || null;

  return (
    <>
      {activeComponents &&
        Object.keys(activeComponents).map(path => {
          const { value, type } = activeComponents[path];
          const label = getLabel(path, config.labelFormat);
          const props = {
            value,
            label
          };

          const componentProps = {
            type,
            path,
            props,
            overrideProps: overrides[path],
            update: updateTheme
          };

          return activeComponents[path] ? (
            <StyledSettingsItem key={path}>
              <MemoizedComponent {...componentProps} />
            </StyledSettingsItem>
          ) : null;
        })}
    </>
  );
};

export default SettingsItem;
