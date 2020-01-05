import * as React from 'react';
import { API } from '@storybook/api';

import setValue from '../helper/setValue';
import {
  Theme,
  ThemesArray,
  ThemeObject,
  ConfigProps,
  OptionsType
} from '../types';
import events from '../events';

export type SettingsContextProps = {
  theme: Theme;
  themes: ThemesArray;
  activeTheme: string;
  overrides: object;
  config: ConfigProps;
  loading: boolean;
  updateTheme: (path: any, value: any) => void;
  updateActiveTheme: (obj: ThemeObject) => void;
};

export type SettingsProviderProps = {
  api: API;
};

export const SettingsContext = React.createContext<SettingsContextProps>({
  theme: {},
  themes: [],
  activeTheme: '',
  overrides: {},
  config: {
    labelFormat: 'startCase',
    debounce: true,
    showCode: true
  },
  loading: false,
  updateTheme: () => {},
  updateActiveTheme: () => {}
});

const SettingsProvider: React.FC<SettingsProviderProps> = ({
  api,
  children
}) => {
  const [themes, setThemes] = React.useState<ThemesArray>([]);
  const [activeThemeName, setActiveThemeName] = React.useState('');
  const [activeTheme, setActiveTheme] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [overrides, setOverrides] = React.useState({});
  const [config, setConfig] = React.useState({
    labelFormat: 'startCase',
    debounce: true,
    showCode: true
  });

  React.useEffect(() => {
    if (config.debounce) {
      const timeout = setTimeout(() => {
        setLoading(false);
        api.emit(events.updateTheme, activeTheme);
      }, 500);
      return () => {
        setLoading(true);
        clearTimeout(timeout);
      };
    } else {
      api.emit(events.updateTheme, activeTheme);
    }
  }, [activeTheme]);

  const getInitialOptions = (options: OptionsType) => {
    const { theme, overrides, config } = options;

    if (Array.isArray(theme)) {
      setThemes(theme);
      setActiveThemeName(theme[0].name);
      setActiveTheme(theme[0].theme);
    } else {
      setActiveTheme(theme);
    }

    if (overrides) setOverrides(overrides);

    if (config) {
      const { labelFormat } = config;

      if (
        labelFormat !== 'path' &&
        labelFormat !== 'startCase' &&
        typeof labelFormat !== 'function'
      ) {
        console.warn(
          "config.labelFormat needs to be one of 'path' || 'startCase' || (path: string[]) => string - Fallback to 'path'"
        );
      }

      setConfig(config);
    }
  };

  React.useEffect(() => {
    api.on(events.receiveOptions, getInitialOptions);
    api.on(events.setThemes, setThemes);

    return () => {
      api.off(events.receiveOptions, getInitialOptions);
      api.off(events.setThemes, setThemes);
    };
  }, []);

  const updateTheme = (path: string[], value: any) => {
    const newTheme: Theme = activeTheme;
    setValue(path, value, newTheme);
    setActiveTheme(prev => ({ ...prev, ...newTheme }));
  };

  const updateActiveTheme = (obj: ThemeObject) => {
    setActiveThemeName(obj.name);
    setActiveTheme(obj.theme);
  };

  const providerValue: SettingsContextProps = {
    theme: activeTheme,
    activeTheme: activeThemeName,
    themes,
    config,
    overrides,
    updateTheme,
    updateActiveTheme,
    loading
  };

  return (
    <SettingsContext.Provider value={providerValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsProvider;
