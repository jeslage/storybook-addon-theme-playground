import * as React from 'react';
import addons from '@storybook/addons';

import setValue from '../helper/setValue';
import { Theme, ThemesArray, ThemeObject, ConfigProps } from '../types';
import events from '../events';

export type SettingsContextProps = {
  theme: Theme;
  themes: ThemesArray;
  activeTheme: string;
  overrides: object;
  config: ConfigProps;
  updateTheme: (path: any, value: any) => void;
  updateActiveTheme: (obj: ThemeObject) => void;
};

export const SettingsContext = React.createContext<SettingsContextProps>({
  theme: {},
  themes: [],
  activeTheme: '',
  overrides: {},
  config: {
    labelFormat: 'startCase'
  },
  updateTheme: () => {},
  updateActiveTheme: () => {}
});

const SettingsProvider: React.FC = ({ children }) => {
  const channel = addons.getChannel();
  const [themes, setThemes] = React.useState<ThemesArray>([]);
  const [activeThemeName, setActiveThemeName] = React.useState('');
  const [activeTheme, setActiveTheme] = React.useState({});

  const [overrides, setOverrides] = React.useState({});
  const [config, setConfig] = React.useState({
    labelFormat: 'startCase'
  });

  React.useEffect(() => {
    // TODO: Debounce updating
    const timeout = setTimeout(() => {
      channel.emit(events.updateTheme, activeTheme);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [activeTheme]);

  const receiveTheme = (initialTheme: object | ThemesArray) => {
    if (Array.isArray(initialTheme)) {
      setThemes(prev => [...prev, ...initialTheme]);
      setActiveThemeName(initialTheme[0].name);
      setActiveTheme(initialTheme[0].theme);
    } else {
      setActiveTheme(initialTheme);
    }
  };

  const receiveConfig = (initialConfig: ConfigProps) => {
    const { labelFormat } = initialConfig;

    if (
      labelFormat !== 'path' &&
      labelFormat !== 'startCase' &&
      typeof labelFormat !== 'function'
    ) {
      console.warn(
        "config.labelFormat needs to be one of 'path' || 'startCase' || (path: string[]) => string - Fallback to 'path'"
      );
    }

    setConfig(initialConfig);
  };
  React.useEffect(() => {
    channel.on(events.setTheme, receiveTheme);
    // Set themes on every theme update due to immutability
    channel.on(events.setThemes, t => setThemes(t));
    channel.on(events.setOverrides, o => setOverrides(o));
    channel.on(events.setConfig, receiveConfig);

    return () => {
      channel.removeListener(events.setTheme, receiveTheme);
      channel.removeListener(events.setThemes, t => setThemes(t));
      channel.removeListener(events.setOverrides, o => setOverrides(o));
      channel.removeListener(events.setConfig, receiveConfig);
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
    updateActiveTheme
  };

  return (
    <SettingsContext.Provider value={providerValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsProvider;
