import * as React from 'react';

import { SettingsContext } from '../../contexts/SettingsProvider';
import is from '../../helper/checks';

import ColorPicker from '../ColorPicker/ColorPicker';
import Counter from '../Counter/Counter';
import Range from '../Range/Range';
import Select, { Option } from '../Select/Select';

import Shorthand from '../Shorthand/Shorthand';
import Switch from '../Switch/Switch';

interface OverrideObject {
  type: string;
  label?: string;
  options: Array<Option>;
}

interface OverrideProps {
  value: any;
  path: string[];
  overrideConfig: OverrideObject;
}

const OverridesItem: React.FC<OverrideProps> = ({
  value,
  path,
  overrideConfig
}) => {
  const { updateTheme } = React.useContext(SettingsContext);
  const { type, label, options, ...rest } = overrideConfig;

  const pathString = path.join('.');

  if (is.object(value) && !is.shorthand(value)) {
    console.warn(
      `The value of override key '${pathString}' is an object. Nothing was returned from render.`
    );

    return null;
  }

  return (
    <>
      {(() => {
        switch (type) {
          case 'counter':
            return (
              <Counter
                key={pathString}
                label={label || pathString}
                value={value}
                onChange={val => updateTheme(path, val)}
                {...rest}
              />
            );
          case 'switch':
            return (
              <Switch
                key={pathString}
                label={label || pathString}
                value={value}
                onChange={val => updateTheme(path, val)}
                {...rest}
              />
            );
          case 'color':
            return (
              <ColorPicker
                key={pathString}
                label={label || pathString}
                value={value}
                onChange={val => updateTheme(path, val)}
                {...rest}
              />
            );
          case 'range':
            return (
              <Range
                key={pathString}
                label={label || pathString}
                value={value}
                onChange={val => updateTheme(path, val)}
                {...rest}
              />
            );
          case 'shorthand':
            return (
              <Shorthand
                key={pathString}
                label={label || pathString}
                value={value}
                onChange={val => updateTheme(path, val)}
                {...rest}
              />
            );
          case 'select':
            return (
              <Select
                key={pathString}
                label={label || pathString}
                initialValue={value}
                onChange={val => updateTheme(path, val)}
                options={options}
              />
            );
          default:
            return null;
        }
      })()}
    </>
  );
};

export default OverridesItem;
