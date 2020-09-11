import { API } from '@storybook/api';
import { ReactNode } from 'react';

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
  overrides: OverridesProps;
  config: ConfigProps;
};

/*
  Overrides
*/
export type OverridesConfig = {
  type:
    | 'color'
    | 'counter'
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

/*
  Settings
*/
export type SettingsProviderProps = {
  api: API;
  children: ReactNode;
};

export type SettingsContextProps = {
  themes: ThemesArray;
  activeTheme: ThemeObject;
  themeComponents: any;
  overrides: OverridesProps;
  config: ConfigProps;
  isLoading: boolean;
  updateTheme: (path: string, value: any) => void;
  updateActiveTheme: (obj: ThemeObject) => void;
  resetThemes: () => void;
};
