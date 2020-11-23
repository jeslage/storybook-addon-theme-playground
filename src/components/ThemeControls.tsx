import React from 'react';
import { styled } from '@storybook/theming';
import { logger } from '@storybook/client-logger';

import {
  BooleanControl,
  ColorControl,
  TextControl,
  NumberControl,
  Form,
  RangeControl,
  OptionsControl
} from '@storybook/components';

import { ControlsConfig } from '../types';

import { getLabel, objectify, rgb2hex, stripUnit } from '../helper';

import Shorthand from './Shorthand';
import Label from './Label';

type ThemeControlProps = {
  type: string;
  path: string;
  props: { label: string; value: any };
  config: ControlsConfig;
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

const ThemeControl = React.memo(
  ({ type, path, config, props, update }: ThemeControlProps) => {
    const { value } = props;
    const [val, unit] = stripUnit(value);

    switch (type) {
      case 'color':
      case 'colorpicker':
        if (type === 'colorpicker') {
          logger.warn(
            "storybook-addon-theme-playground: Override type 'colorpicker' will be deprecated soon, please use type 'color' instead."
          );
          logger.warn(
            'Learn more about all override components here: https://github.com/jeslage/storybook-addon-theme-playground#override-components'
          );
        }

        return (
          <ColorControl
            name={path}
            value={value}
            onChange={(val) => update(path, rgb2hex(val))}
          />
        );
      case 'counter':
      case 'number':
        if (type === 'counter') {
          logger.warn(
            "storybook-addon-theme-playground: Override type 'counter' will be deprecated soon, please use type 'number' instead."
          );
          logger.warn(
            'Learn more about all override components here: https://github.com/jeslage/storybook-addon-theme-playground#override-components'
          );
        }

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
      case 'range':
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
      case 'input':
        return (
          <TextControl
            name={path}
            value={value}
            onChange={(val) => update(path, val)}
          />
        );
      case 'shorthand':
        return (
          <Shorthand value={value} onChange={(val) => update(path, val)} />
        );
      case 'switch':
        return (
          <BooleanControl
            name={path}
            value={value}
            onChange={(val) => update(path, val)}
          />
        );
      case 'textarea':
        return (
          <Form.Textarea
            height={50}
            name={path}
            value={value}
            onChange={(val) => update(path, val)}
          />
        );
      case 'select':
        return (
          <OptionsControl
            type="select"
            name={path}
            value={value}
            defaultValue={value}
            options={objectify(config.options)}
            onChange={(val) => {
              update(path, val);
            }}
          />
        );
      case 'radio':
        return (
          <OptionsControl
            type="radio"
            name={path}
            value={value}
            options={objectify(config.options)}
            onChange={(val) => update(path, val)}
          />
        );
      default:
        return (
          <TextControl
            name={path}
            value={value}
            onChange={(val) => update(path, val)}
          />
        );
    }
  }
);

ThemeControl.displayName = 'ThemeControl';

const ThemeControls = ({ themeComponents, controls, config, onUpdate }) => {
  return (
    <>
      {themeComponents &&
        Object.keys(themeComponents).map((path) => {
          const { value, type } = themeComponents[path];

          const label = getLabel(path, config.labelFormat);

          const props = {
            value,
            label
          };

          const themeControlProps = {
            type,
            path,
            props,
            config: controls[path],
            update: onUpdate
          };

          return themeComponents[path] ? (
            <StyledThemeControls key={path}>
              <Label
                label={controls[path]?.label || props.label}
                description={controls[path]?.description}
                icon={controls[path]?.icon}
              />

              <ThemeControl {...themeControlProps} />
            </StyledThemeControls>
          ) : null;
        })}
    </>
  );
};

export default React.memo(ThemeControls);
