import { API } from '@storybook/api';

/*
  Theme
*/
export type ThemeObject = { name: string; theme: object };
export type ThemesArray = Array<ThemeObject>;
export type Theme = ThemesArray | { [key: string]: any };

/*
  Config
*/
export type ConfigProps = {
  labelFormat: any;
  showCode: boolean;
  debounce: boolean;
  debounceRate: number;
};

/*
  Options
*/
export type OptionsType = {
  theme: Theme;
  overrides: Overrides;
  config: ConfigProps;
};

/*
  Overrides
*/
export type OverridesObject = {
  type: string;
  [key: string]: any;
};

export type Overrides = {
  [key: string]: OverridesObject;
};

/*
  Settings
*/
export type SettingsProviderProps = {
  api: API;
};

export type SettingsContextProps = {
  themes: ThemesArray;
  activeTheme: ThemeObject;
  themeComponents: {};
  overrides: Overrides;
  config: ConfigProps;
  isLoading: boolean;
  updateTheme: (path: any, value: any) => void;
  updateActiveTheme: (obj: ThemeObject) => void;
  resetThemes: () => void;
};
