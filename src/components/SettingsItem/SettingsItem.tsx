import * as React from 'react';

import { SettingsContext } from '../../contexts/SettingsProvider';

import is from '../../helper/checks';
import getLabel from '../../helper/getLabel';

import Counter from '../Counter/Counter';
import Colorpicker from '../ColorPicker/ColorPicker';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import Switch from '../Switch/Switch';
import Range from '../Range/Range';
import Shorthand from '../Shorthand/Shorthand';
import OverridesItem from '../OverridesItem/OverridesItem';

import { StyledSettingsItem } from './SettingsItem.style';

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
  const { updateTheme, overrides, config } = React.useContext(SettingsContext);

  const keys: string[] = Object.keys(obj).sort(descending);

  return (
    <>
      {keys.map(key => {
        const value = obj[key];
        const path = [...arr, key];
        const pathString = path.join('.');

        const pathLabel = getLabel(path, config.labelFormat);

        if (overrides[pathString]) {
          if (overrides[pathString].hidden) {
            return null;
          }

          return (
            <StyledSettingsItem key={pathString}>
              <OverridesItem
                value={value}
                path={path}
                overrideConfig={overrides[pathString]}
              />
            </StyledSettingsItem>
          );
        }

        if (is.object(value)) {
          if (is.shorthand(value)) {
            return (
              <StyledSettingsItem key={pathString}>
                <Shorthand
                  value={value}
                  label={pathLabel}
                  onChange={val => updateTheme(path, val)}
                />
              </StyledSettingsItem>
            );
          }

          return <SettingsItem obj={value} arr={path} key={pathString} />;
        }

        if (is.array(value)) {
          return value.map((item, index) => (
            <SettingsItem obj={item} arr={[...path, index]} key={pathString} />
          ));
        }

        if (is.boolean(value)) {
          return (
            <StyledSettingsItem key={pathString}>
              <Switch
                label={pathLabel}
                value={value}
                onChange={val => updateTheme(path, val)}
              />
            </StyledSettingsItem>
          );
        }

        if (is.number(value)) {
          return (
            <StyledSettingsItem key={pathString}>
              <Counter
                label={pathLabel}
                value={parseFloat(value)}
                onChange={val => updateTheme(path, val)}
              />
            </StyledSettingsItem>
          );
        }

        if (is.string(value)) {
          if (is.color(value, key)) {
            return (
              <StyledSettingsItem key={pathString}>
                <Colorpicker
                  label={pathLabel}
                  value={value}
                  onChange={val => updateTheme(path, val)}
                />
              </StyledSettingsItem>
            );
          }

          if (is.unit(value)) {
            const [, number, suffix] = value.match(/^(\d+(?:\.\d+)?)(.*)$/);

            return (
              <StyledSettingsItem key={pathString}>
                <Range
                  label={pathLabel}
                  suffix={suffix}
                  value={parseFloat(number)}
                  onChange={val => updateTheme(path, `${val}${suffix}`)}
                />
              </StyledSettingsItem>
            );
          }

          if (is.text(value)) {
            return (
              <StyledSettingsItem key={pathString}>
                <Textarea
                  label={pathLabel}
                  value={value}
                  onChange={val => updateTheme(path, val)}
                />
              </StyledSettingsItem>
            );
          }

          return (
            <StyledSettingsItem key={pathString}>
              <Input
                label={pathLabel}
                value={value}
                onChange={val => updateTheme(path, val)}
              />
            </StyledSettingsItem>
          );
        }
      })}
    </>
  );
};

export default SettingsItem;
