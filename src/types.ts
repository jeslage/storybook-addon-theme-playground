import { IconsProps } from "@storybook/components";

export interface ThemePlaygroundProps<T = undefined> {
  theme: T;
  provider: (props: { children: any; name?: string; theme?: any }) => any;
  controls?: ControlsProps;
  config?: ConfigProps;
  disabled?: boolean;
}

/*
  Theme
*/
export type ThemeObject = { name: string; theme: any };
export type ThemesArray = ThemeObject[];

export type LabelFormatFunction = (path: string[]) => string;

/*
  Config
*/
export type ConfigProps = {
  labelFormat?: "startCase" | "path" | LabelFormatFunction;
  showCode?: boolean;
  debounce?: boolean;
  debounceRate?: number;
};

/*
  Controls
*/
export type ControlsConfig = {
  type:
    | "text"
    | "color"
    | "counter"
    | "number"
    | "select"
    | "shorthand"
    | "switch"
    | "radio"
    | "range";
  icon?: IconsProps["icon"];
  hidden?: boolean;
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  steps?: number;
  options?: {
    value: string | number;
    label: string;
  }[];
};

export type ControlsProps = {
  [key: string]: ControlsConfig;
};

export type ProviderState = { theme: ThemesArray };

export type PanelState = {
  initialized: boolean;
  selected: number;
  theme: ThemesArray;
  controls?: ControlsProps;
  config: ConfigProps;
  loading: boolean;
};
