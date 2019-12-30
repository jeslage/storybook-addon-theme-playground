import * as React from 'react';
import addons from '@storybook/addons';

import setValue from '../helper/setValue';

type ThemesArray = Array<{ name: string; theme: object }>;

export type SettingsContextProps = {
  theme: ThemesArray | object;
  themes: ThemesArray;
  activeTheme: string;
  overrides: object;
  updateTheme: (path: any, value: any) => void;
  updateActiveTheme: (value: string) => void;
};

export const SettingsContext = React.createContext<SettingsContextProps>({
  theme: {},
  themes: [],
  activeTheme: '',
  overrides: {},
  updateTheme: () => {},
  updateActiveTheme: () => {}
});

const SettingsProvider: React.FC = ({ children }) => {
  const channel = addons.getChannel();
  const [themes, setThemes] = React.useState<ThemesArray>([]);
  const [activeThemeName, setActiveThemeName] = React.useState('');
  const [activeTheme, setActiveTheme] = React.useState({});

  const [overrides, setOverrides] = React.useState({});

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      channel.emit('storybook-addon-theme-playground/updateTheme', activeTheme);
    }, 200);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeTheme]);

  const receiveTheme = (t: object) => {
    if (Array.isArray(t)) {
      setThemes(t);
      setActiveThemeName(t[0].name);
      setActiveTheme(t[0].theme);
    } else {
      setActiveTheme(t);
    }
  };

  React.useEffect(() => {
    channel.on('storybook-addon-theme-playground/setTheme', receiveTheme);
    channel.on('storybook-addon-theme-playground/setOverrides', o =>
      setOverrides(o)
    );

    return () => {
      channel.removeListener(
        'storybook-addon-theme-playground/setTheme',
        receiveTheme
      );
      channel.removeListener('storybook-addon-theme-playground/setOverrides', o =>
        setOverrides(o)
      );
    };
  }, []);

  const updateTheme = (path, value) => {
    const newTheme = activeTheme;
    setValue(path, value, newTheme);

    setActiveTheme(prev => ({ ...prev, ...newTheme }));
  };

  const updateActiveTheme = value => {
    const newTheme: ThemesArray = themes.filter(t => t.name === value);

    setActiveThemeName(newTheme[0].name);
    setActiveTheme(newTheme[0].theme);
  };

  const providerValue: SettingsContextProps = {
    theme: activeTheme,
    activeTheme: activeThemeName,
    themes,
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
