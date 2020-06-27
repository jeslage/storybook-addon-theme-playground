import * as React from 'react';

import { SettingsContext } from '../../contexts/SettingsProvider';

import { getLabel } from '../../helper';

import Colorpicker from '../ColorPicker/ColorPicker';
import Counter from '../Counter/Counter';
import Input from '../Input/Input';
import RadioGroup from '../RadioGroup/RadioGroup';
import Range from '../Range/Range';
import Select from '../Select/Select';
import Shorthand from '../Shorthand/Shorthand';
import Switch from '../Switch/Switch';
import Textarea from '../Textarea/Textarea';

import { StyledSettingsItem } from './SettingsItem.style';
import { stripUnit } from '../../helper/stripUnit';

interface ComponentProps {
  type: string;
  path: string;
  props: { label: string; value: any };
  overrideProps: any;
  update: (path: string, value: any) => void;
}

const Component: React.FC<ComponentProps> = ({
  type,
  path,
  overrideProps,
  props,
  update,
}) => {
  const { value, label } = props;
  const [val, unit] = stripUnit(value);

  switch (type) {
    case 'colorpicker':
      return (
        <Colorpicker
          label={label}
          value={value}
          onChange={(val) => update(path, val)}
          {...overrideProps}
        />
      );
    case 'counter':
      return (
        <Counter
          label={label}
          suffix={unit}
          value={parseFloat(val)}
          onChange={(val, suffix) =>
            update(path, suffix ? `${val}${suffix}` : val)
          }
          {...overrideProps}
        />
      );
    case 'range':
      return (
        <Range
          label={props.label}
          suffix={unit}
          value={parseFloat(val)}
          onChange={(val, suffix) =>
            update(path, suffix ? `${val}${suffix}` : val)
          }
          {...overrideProps}
        />
      );
    case 'input':
      return (
        <Input
          label={label}
          value={value}
          onChange={(val) => update(path, val)}
          {...overrideProps}
        />
      );
    case 'shorthand':
      return (
        <Shorthand
          label={label}
          value={value}
          onChange={(val) => update(path, val)}
          {...overrideProps}
        />
      );
    case 'switch':
      return (
        <Switch
          label={label}
          value={value}
          onChange={(val) => update(path, val)}
          {...overrideProps}
        />
      );
    case 'textarea':
      return (
        <Textarea
          label={label}
          value={value}
          onChange={(val) => update(path, val)}
          {...overrideProps}
        />
      );
    case 'select':
      return (
        <Select
          label={label}
          value={value}
          onChange={(val) => update(path, val)}
          {...overrideProps}
        />
      );
    case 'radio':
      return (
        <RadioGroup
          label={label}
          value={value}
          name={label}
          onChange={(val) => update(path, val)}
          {...overrideProps}
        />
      );
    default:
      return (
        <Input
          label={label}
          value={value}
          onChange={(val) => update(path, val)}
          {...overrideProps}
        />
      );
  }
};

const areEqual = (prev, next) => {
  const prevOverrideProps = prev.overrideProps ? prev.overrideProps : null;
  const nextOverrideProps = next.overrideProps ? next.overrideProps : null;

  return (
    prev.props.value === next.props.value &&
    JSON.stringify(prevOverrideProps) === JSON.stringify(nextOverrideProps)
  );
};

export const MemoizedComponent = React.memo(Component, areEqual);

const SettingsItem = () => {
  const {
    updateTheme,
    overrides,
    config,
    themeComponents,
    activeTheme: { name },
  } = React.useContext(SettingsContext);

  const activeComponents = themeComponents[name] || null;

  return (
    <>
      {activeComponents &&
        Object.keys(activeComponents).map((path) => {
          const { value, type } = activeComponents[path];
          const label = getLabel(path, config.labelFormat);
          const props = {
            value,
            label,
          };

          const componentProps = {
            type,
            path,
            props,
            overrideProps: overrides[path],
            update: updateTheme,
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
