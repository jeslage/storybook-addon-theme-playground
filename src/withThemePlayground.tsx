import * as React from 'react';
import addons from '@storybook/addons';

import { Theme, ConfigProps } from './types';
import events from './events';

interface ThemeProviderProps {
  theme: Theme;
  provider: any;
  overrides: object;
  config: ConfigProps;
}

export const withThemePlayground = ({
  theme,
  provider,
  overrides,
  config
}: ThemeProviderProps) => story => {
  if (!provider) {
    throw Error(
      'Missing ThemeProvider in withThemePlayground decorator options.'
    );
  }

  if (!theme) {
    throw Error('Missing theme key in withThemePlayground decorator options.');
  }

  const channel = addons.getChannel();

  const [currentTheme, setCurrentTheme] = React.useState(
    Array.isArray(theme) ? theme[0].theme : theme
  );

  const ThemeProvider = provider;

  React.useEffect(() => {
    channel.on(events.updateTheme, t => {
      setCurrentTheme(t);

      // Set themes on every theme update due to immutability
      if (Array.isArray(theme)) {
        channel.emit(events.setThemes, theme);
      }
    });

    channel.emit(events.setTheme, theme);

    if (overrides) {
      channel.emit(events.setOverrides, overrides);
    }

    if (config) {
      channel.emit(events.setConfig, config);
    }

    return () => {
      channel.removeListener(events.updateTheme, t => setCurrentTheme(t));
    };
  }, []);

  return <ThemeProvider theme={currentTheme}>{story()}</ThemeProvider>;
};
