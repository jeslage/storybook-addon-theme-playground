import React from "react";
import { styled } from "@storybook/theming";
import { useAddonState } from "@storybook/manager-api";

import { ControlsConfig, PanelState } from "../types";
import { ADDON_ID } from "../constants";

import buildControlsObject from "../lib/buildControlsObject";
import { formatLabel, updateObjectAtKey } from "../lib/misc";

import Label from "./Label";
import Control from "./Control";

type ControlsProps = {
  type: ControlsConfig["type"];
  path: string;
  props: { label: string; value: any };
  config?: ControlsConfig;
  update: (path: string, value: any) => void;
};

export const ControlsWrapper = styled.div`
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

const Controls = () => {
  const [state, setState] = useAddonState<PanelState>(ADDON_ID);

  const components = buildControlsObject(
    state.theme[state.selected].theme,
    state.controls
  );

  const updateTheme = (path: string, value: any) => {
    const { theme: currentTheme } = state.theme[state.selected];

    const theme = currentTheme;
    updateObjectAtKey(path, value, theme);

    setState((p) => ({
      ...p,
      theme: p.theme.map((t, i) => (i === p.selected ? { ...t, theme } : t)),
    }));
  };

  return (
    <>
      {components &&
        Object.keys(components).map((path) => {
          const { value, type } = components[path];
          const control = state.controls ? state.controls[path] : undefined;

          const label = formatLabel(path, state.config?.labelFormat);

          const props = {
            value,
            label,
          };

          const controlProps: ControlsProps = {
            type,
            path,
            props,
            config: control,
            update: updateTheme,
          };

          return components[path] ? (
            <ControlsWrapper key={path}>
              <Label
                label={control?.label || props.label}
                description={control?.description}
                icon={control?.icon}
              />

              <Control {...controlProps} />
            </ControlsWrapper>
          ) : null;
        })}
    </>
  );
};

export default Controls;
