import { API } from '@storybook/api';
import { ReactNode } from 'react';

/*
  Theme
*/
export type ThemeObject = { name: string; theme: object };
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
export type OverridesProps = {
  [key: string]: {
    type:
      | 'color'
      | 'counter'
      | 'select'
      | 'shorthand'
      | 'switch'
      | 'radio'
      | 'range';

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
