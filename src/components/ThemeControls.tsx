import React from 'react';
import { styled } from '@storybook/theming';
import { useAddonState } from '@storybook/manager-api';

import { ControlsConfig, PanelState } from '../types';
import { THEME_PLAYGROUND_STATE } from '../constants';

import { getThemeComponents } from '../helper/buildThemeComponents';
import { getLabel, updateValueBasedOnPath } from '../helper';

import Label from './Label';
import ThemeControl from './ThemeControl';

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

const ThemeControls = () => {
  const [state, setState] = useAddonState<PanelState>(THEME_PLAYGROUND_STATE);
  const components = getThemeComponents(
    state.theme[state.selected].theme,
    state.controls
  );

  const updateTheme = (path: string, value: any) => {
    const { theme: currentTheme } = state.theme[state.selected];

    const theme = currentTheme;
    updateValueBasedOnPath(path, value, theme);

    setState((prev) => ({
      ...prev,
      theme: prev.theme.map((t, i) =>
        i === prev.selected ? { ...t, theme } : t
      )
    }));
  };

  return (
    <>
      {components &&
        Object.keys(components).map((path) => {
          const { value, type } = components[path];
          const control = state.controls ? state.controls[path] : undefined;

          const label = getLabel(path, state.config?.labelFormat);

          const props = {
            value,
            label
          };

          const controlProps: ThemeControlProps = {
            type,
            path,
            props,
            config: control,
            update: updateTheme
          };

          return components[path] ? (
            <StyledThemeControls key={path}>
              <Label
                label={control?.label || props.label}
                description={control?.description}
                icon={control?.icon}
              />

              <ThemeControl {...controlProps} />
            </StyledThemeControls>
          ) : null;
        })}
    </>
  );
};

export default ThemeControls;
