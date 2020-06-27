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

export const withThemePlayground = (options: ThemeProviderProps) => (story) => {
  const { theme, provider, overrides, config } = options;

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

  const handleReset = () => {
    return channel.emit(events.resetOptions, { theme, overrides, config });
  };

  React.useEffect(() => {
    channel.on(events.updateTheme, setCurrentTheme);
    channel.on(events.reset, handleReset);

    channel.emit(events.receiveOptions, { theme, overrides, config });

    return () => {
      channel.removeListener(events.updateTheme, setCurrentTheme);
      channel.removeListener(events.reset, handleReset);
    };
  }, []);

  return <ThemeProvider theme={currentTheme}>{story()}</ThemeProvider>;
};
