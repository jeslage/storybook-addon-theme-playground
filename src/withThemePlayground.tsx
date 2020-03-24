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

  React.useEffect(() => {
    channel.on(events.updateTheme, (t) => {
      setCurrentTheme(t);
    });
    channel.on(events.reset, () =>
      channel.emit(events.resetOptions, { theme, overrides, config })
    );

    channel.emit(events.receiveOptions, { theme, overrides, config });

    return () => {
      channel.removeListener(events.updateTheme, (t) => setCurrentTheme(t));
      channel.removeListener(events.reset, () =>
        channel.emit(events.resetOptions, { theme, overrides, config })
      );
    };
  }, []);

  return <ThemeProvider theme={currentTheme}>{story()}</ThemeProvider>;
};
