import * as React from 'react';

import { SettingsContext } from '../../contexts/SettingsProvider';

import Counter from '../Counter/Counter';
import Colorpicker from '../ColorPicker/ColorPicker';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import Switch from '../Switch/Switch';
import Range from '../Range/Range';

import is from '../../helper/checks';
import Shorthand from '../Shorthand/Shorthand';
import OverridesItem from '../OverridesItem/OverridesItem';

const descending = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
};

interface SettingsProps {
  obj: object;
  arr: string[];
}

const SettingsItem: React.FC<SettingsProps> = ({ obj, arr }) => {
  const { updateTheme, overrides } = React.useContext(SettingsContext);

  const keys: string[] = Object.keys(obj).sort(descending);

  return (
    <React.Fragment>
      {keys.map(key => {
        const value = obj[key];
        const path = [...arr, key];
        const pathString = path.join('.');

        if (overrides[pathString]) {
          return (
            <OverridesItem
              key={pathString}
              value={value}
              path={path}
              overrideConfig={overrides[pathString]}
            />
          );
        }

        if (is.object(value)) {
          if (is.shorthand(value)) {
            return (
              <Shorthand
                value={value}
                key={pathString}
                label={pathString}
                onChange={val => updateTheme(path, val)}
              />
            );
          }

          return <SettingsItem obj={value} arr={path} key={pathString} />;
        }

        if (is.array(value)) {
          return value.map((item, index) => (
            <SettingsItem key={pathString} obj={item} arr={[...path, index]} />
          ));
        }

        if (is.boolean(value)) {
          return (
            <Switch
              key={pathString}
              label={pathString}
              value={value}
              onChange={val => updateTheme(path, val)}
            />
          );
        }

        if (is.number(value)) {
          return (
            <Counter
              key={pathString}
              label={pathString}
              value={parseFloat(value)}
              onChange={val => updateTheme(path, val)}
            />
          );
        }

        if (is.string(value)) {
          if (is.color(value, key)) {
            return (
              <Colorpicker
                key={pathString}
                label={pathString}
                value={value}
                onChange={val => updateTheme(path, val)}
              />
            );
          }

          if (is.unit(value)) {
            const [, number, suffix] = value.match(/^(\d+(?:\.\d+)?)(.*)$/);

            return (
              <Range
                key={pathString}
                label={pathString}
                suffix={suffix}
                value={parseFloat(number)}
                onChange={val => updateTheme(path, `${val}${suffix}`)}
              />
            );
          }

          if (is.text(value)) {
            return (
              <Textarea
                key={pathString}
                label={pathString}
                value={value}
                onChange={val => updateTheme(path, val)}
              />
            );
          }

          return (
            <Input
              key={pathString}
              label={pathString}
              value={value}
              onChange={val => updateTheme(path, val)}
            />
          );
        }
      })}
    </React.Fragment>
  );
};

export default SettingsItem;
