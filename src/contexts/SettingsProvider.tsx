import React, { useState, useEffect, useCallback, createContext } from 'react';

import { updateValueBasedOnPath } from '../helper';
import {
  ThemesArray,
  ThemeObject,
  ConfigProps,
  OptionsType,
  OverridesProps,
  SettingsContextProps,
  SettingsProviderProps,
} from '../types';
import events from '../events';
import buildThemeComponents from '../helper/buildThemeComponents';

const defaultConfig: ConfigProps = {
  labelFormat: 'startCase',
  debounce: true,
  debounceRate: 500,
  showCode: true,
};

const defaultProps: SettingsContextProps = {
  themes: [{ name: 'Default', theme: {} }],
  themeComponents: {},
  activeTheme: { name: '__default', theme: {} },
  overrides: {},
  config: defaultConfig,
  isLoading: false,
  updateTheme: () => {},
  updateActiveTheme: () => {},
  resetThemes: () => {},
};

export const SettingsContext = createContext<SettingsContextProps>(
  defaultProps
);

const SettingsProvider = ({ api, children }: SettingsProviderProps) => {
  const [themeComponents, setThemeComponents] = useState({});
  const [themes, setThemes] = useState<ThemesArray>([]);
  const [activeTheme, setActiveTheme] = useState<ThemeObject>({
    name: '',
    theme: {},
  });

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [overrides, setOverrides] = useState<OverridesProps>({});
  const [config, setConfig] = useState<ConfigProps>(defaultConfig);

  useEffect(() => {
    if (config.debounce && isMounted && activeTheme.theme) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        api.emit(events.updateTheme, activeTheme.theme);
      }, config.debounceRate);
      return () => {
        setIsLoading(true);
        clearTimeout(timeout);
      };
    } else {
      if (isLoading) {
        setIsLoading(false);
      }
      api.emit(events.updateTheme, activeTheme.theme);
    }
  }, [activeTheme]);

  const updateThemeComponents = (theme: any, overrides: OverridesProps) => {
    const components: { [key: string]: any } = {};

    if (Array.isArray(theme)) {
      theme.forEach(({ name, theme }) => {
        components[name] = buildThemeComponents(theme, overrides);
      });
    } else {
      components.__default = buildThemeComponents(theme, overrides);
    }

    setThemeComponents(components);
  };

  const getInitialOptions = useCallback((options: OptionsType) => {
    const { theme, overrides, config } = options;

    updateThemeComponents(theme, overrides || {});

    if (Array.isArray(theme)) {
      setThemes(theme);
      setActiveTheme({ ...theme[0] });
    } else {
      setActiveTheme({ name: '__default', theme });
    }

    if (overrides) setOverrides(overrides);
    if (config) setConfig((prev) => ({ ...prev, ...config }));
  }, []);

  useEffect(() => {
    api.on(events.receiveOptions, getInitialOptions);
    api.on(events.resetOptions, getInitialOptions);
    setIsMounted(true);

    return () => {
      api.off(events.receiveOptions, getInitialOptions);
      api.off(events.resetOptions, getInitialOptions);
      setIsMounted(false);
    };
  }, []);

  const updateTheme = useCallback(
    (path: string, value: any) => {
      const { theme, name } = activeTheme;

      // Update theme object value based on path and set active theme state
      const newTheme = theme;
      updateValueBasedOnPath(path, value, newTheme);
      setActiveTheme({ name, theme: newTheme });

      // Set new theme components state
      setThemeComponents((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          [path]: { type: prev[name][path].type, value },
        },
      }));
    },
    [activeTheme]
  );

  const updateActiveTheme = useCallback(
    ({ name, theme }: ThemeObject) => {
      setActiveTheme({ name, theme });
    },
    [activeTheme.theme]
  );

  const providerValue: SettingsContextProps = {
    activeTheme,
    themes,
    themeComponents,
    config,
    overrides,
    updateTheme,
    updateActiveTheme,
    isLoading,
    resetThemes: () => api.emit(events.reset),
  };

  return (
    <SettingsContext.Provider value={providerValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsProvider;
