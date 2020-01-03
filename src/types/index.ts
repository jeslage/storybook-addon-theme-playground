export type ThemeObject = { name: string; theme: object };
export type ThemesArray = Array<ThemeObject>;
export type Theme = ThemesArray | object;
export type ConfigProps = {
  labelFormat: any;
  showCode: boolean;
  debounce: boolean;
};

export type OptionsType = {
  theme: object | ThemesArray;
  overrides: object;
  config: ConfigProps;
};
