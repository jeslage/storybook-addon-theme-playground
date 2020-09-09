import React, { useContext } from 'react';

import { SettingsContext } from '../../contexts/SettingsProvider';

import { OverridesConfig } from '../../types';
import { getLabel } from '../../helper';
import { stripUnit } from '../../helper/stripUnit';

import Colorpicker from '../ColorPicker/ColorPicker';
import Counter from '../Counter/Counter';
import Input from '../Input/Input';
import RadioGroup, { RadioOption } from '../RadioGroup/RadioGroup';
import Range from '../Range/Range';
import Select, { SelectOption } from '../Select/Select';
import Shorthand from '../Shorthand/Shorthand';
import Switch from '../Switch/Switch';
import Textarea from '../Textarea/Textarea';

import { StyledSettingsItem } from './SettingsItem.style';
import Label from '../Label/Label';

interface ComponentProps {
  type: string;
  path: string;
  props: { label: string; value: any };
  config: OverridesConfig;
  update: (path: string, value: any) => void;
}

const Component = ({ type, path, config, props, update }: ComponentProps) => {
  const { value, label } = props;
  const [val, unit] = stripUnit(value);

  switch (type) {
    case 'colorpicker':
      return (
        <Colorpicker value={value} onChange={(val) => update(path, val)} />
      );
    case 'counter':
      return (
        <Counter
          suffix={unit}
          value={parseFloat(val)}
          onChange={(val, suffix) =>
            update(path, suffix ? `${val}${suffix}` : val)
          }
          max={config?.max}
          min={config?.min}
          steps={config?.steps}
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
          max={config?.max}
          min={config?.min}
          steps={config?.steps}
        />
      );
    case 'input':
      return <Input value={value} onChange={(val) => update(path, val)} />;
    case 'shorthand':
      return <Shorthand value={value} onChange={(val) => update(path, val)} />;
    case 'switch':
      return <Switch value={value} onChange={(val) => update(path, val)} />;
    case 'textarea':
      return <Textarea value={value} onChange={(val) => update(path, val)} />;
    case 'select':
      return (
        <Select
          value={value}
          onChange={(val) => update(path, val)}
          options={(config.options as SelectOption[]) || []}
        />
      );
    case 'radio':
      return (
        <RadioGroup
          value={value}
          name={label}
          onChange={(val) => update(path, val)}
          options={(config.options as RadioOption[]) || []}
        />
      );
    default:
      return <Input value={value} onChange={(val) => update(path, val)} />;
  }
};

const areEqual = (prev, next) => {
  const prevConfig = prev.config ? prev.config : null;
  const nextConfig = next.config ? next.config : null;

  return (
    prev.props.value === next.props.value &&
    JSON.stringify(prevConfig) === JSON.stringify(nextConfig)
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
  } = useContext(SettingsContext);

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
            config: overrides[path],
            update: updateTheme,
          };

          return activeComponents[path] ? (
            <StyledSettingsItem key={path}>
              <Label
                label={overrides[path]?.label || props.label}
                description={overrides[path]?.description}
                icon={overrides[path]?.icon}
              />

              <MemoizedComponent {...componentProps} />
            </StyledSettingsItem>
          ) : null;
        })}
    </>
  );
};

export default SettingsItem;
