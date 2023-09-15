import React from "react";
import { styled } from "@storybook/theming";

import {
  BooleanControl,
  TextControl,
  ColorControl,
  OptionsControl,
  NumberControl,
  RangeControl,
} from "@storybook/blocks";

import { ControlsConfig } from "../types";
import { stripUnit } from "../lib/misc";

import Shorthand from "./Shorthand";

type ControlProps = {
  type: ControlsConfig["type"];
  path: string;
  props: { label: string; value: any };
  config?: ControlsConfig;
  update: (path: string, value: any) => void;
};

const Control = ({ type, path, config, props, update }: ControlProps) => {
  const { value } = props;
  const [val, unit] = stripUnit(value);

  if (type === "color") {
    return (
      <ColorControl
        name={path}
        value={value}
        onChange={(val) => update(path, val)}
      />
    );
  }

  if (type === "number") {
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

  if (type === "range") {
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

  if (type === "text") {
    return (
      <TextControl
        name={path}
        value={value}
        onChange={(val) => update(path, val)}
      />
    );
  }

  if (type === "shorthand") {
    return <Shorthand value={value} onChange={(val) => update(path, val)} />;
  }

  if (type === "switch") {
    return (
      <BooleanControl
        name={path}
        value={value}
        onChange={(val) => update(path, val)}
      />
    );
  }

  if (type === "radio" || type === "select") {
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

Control.displayName = "Control";

export default Control;
