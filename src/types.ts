import { IconKey } from '@storybook/components/dist/icon/icons';

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
  labelFormat?: 'startCase' | 'path' | LabelFormatFunction;
  showCode?: boolean;
  debounce?: boolean;
  debounceRate?: number;
};

/*
  Options
*/
export type OptionsType = {
  theme: any;
  overrides?: OverridesProps;
  config?: ConfigProps;
};

/*
  Overrides
*/
export type OverridesConfig = {
  type:
    | 'color'
    | 'counter'
    | 'number'
    | 'select'
    | 'shorthand'
    | 'switch'
    | 'radio'
    | 'range';
  icon?: IconKey;
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

export type OverridesProps = {
  [key: string]: OverridesConfig;
};

export type ProviderState = { theme: ThemesArray };

export type PanelState = {
  selected: number;
  theme: ThemesArray;
  themeComponents: any;
  overrides?: OverridesProps;
  config: ConfigProps;
};
