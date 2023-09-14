import React from 'react';
import { styled } from '@storybook/theming';

import {
  BooleanControl,
  TextControl,
  ColorControl,
  OptionsControl,
  NumberControl,
  RangeControl
} from '@storybook/blocks';

import { ControlsConfig } from '../types';
import { stripUnit } from '../helper';

import Shorthand from './Shorthand';

type ThemeControlProps = {
  type: ControlsConfig['type'];
  path: string;
  props: { label: string; value: any };
  config?: ControlsConfig;
  update: (path: string, value: any) => void;
};

export const StyledThemeControls = styled.div`
  position: relative;
  padding: 0.75em 1rem;
  min-height: 65px;
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, auto));
  grid-gap: 10px;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.appBorderColor};

  & > div + * {
    max-width: 240px;
    justify-self: flex-end;
    margin-bottom: 0;
  }

  &:nth-of-type(even) {
    background: rgba(0, 0, 0, 0.004);
  }
`;

const ThemeControl = ({
  type,
  path,
  config,
  props,
  update
}: ThemeControlProps) => {
  const { value } = props;
  const [val, unit] = stripUnit(value);

  if (type === 'color') {
    return (
      <ColorControl
        name={path}
        value={value}
        onChange={(val) => update(path, val)}
      />
    );
  }

  if (type === 'number') {
    return (
      <NumberControl
        name={path}
        value={parseFloat(val)}
        onChange={(val) => update(path, unit ? `${val}${unit}` : val)}
        max={config?.max}
        min={config?.min}
        step={config?.steps}
      />
    );
  }

  if (type === 'range') {
    return (
      <RangeControl
        name={props.label}
        value={parseFloat(val)}
        onChange={(val) => update(path, unit ? `${val}${unit}` : val)}
        max={config?.max}
        min={config?.min}
        step={config?.steps}
      />
    );
  }

  if (type === 'text') {
    return (
      <TextControl
        name={path}
        value={value}
        onChange={(val) => update(path, val)}
      />
    );
  }

  if (type === 'shorthand') {
    return <Shorthand value={value} onChange={(val) => update(path, val)} />;
  }

  if (type === 'switch') {
    return (
      <BooleanControl
        name={path}
        value={value}
        onChange={(val) => update(path, val)}
      />
    );
  }

  if (type === 'radio' || type === 'select') {
    return (
      <OptionsControl
        name={path}
        type={type}
        defaultValue={value}
        argType={{ options: config?.options?.map((i) => i.value) }}
        labels={
          config?.options?.reduce(
            (prev, curr) => ({ ...prev, [`${curr.value}`]: curr.label }),
            {}
          ) as Record<any, string>
        }
        value={value}
        onChange={(val) => update(path, val)}
      />
    );
  }

  return (
    <TextControl
      name={path}
      value={value}
      onChange={(val) => update(path, val)}
    />
  );
};

ThemeControl.displayName = 'ThemeControl';

export default ThemeControl;
