import * as React from 'react';
import addons from '@storybook/addons';

import { Theme } from './types';

interface ThemeProviderProps {
  theme: Theme;
  provider: any;
  overrides: object;
}

export const withThemePlayground = ({
  theme,
  provider,
  overrides
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
    channel.on('storybook-addon-theme-playground/updateTheme', t => {
      setCurrentTheme(t);
    });
    channel.emit('storybook-addon-theme-playground/setTheme', theme);

    if (overrides) {
      channel.emit('storybook-addon-theme-playground/setOverrides', overrides);
    }

    return () => {
      channel.removeListener('storybook-theme/updateTheme', t =>
        setCurrentTheme(t)
      );
    };
  }, []);

  return <ThemeProvider theme={currentTheme}>{story()}</ThemeProvider>;
};
