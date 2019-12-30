import * as React from 'react';
import addons from '@storybook/addons';

import { ThemeProvider } from '@storybook/theming';

interface ThemeProviderProps {
  theme: Array<{ name: string; theme: object }> | object;
  provider: any;
  overrides: object;
}

export const withThemePlayground = ({
  theme,
  provider,
  overrides
}: ThemeProviderProps) => story => {
  const channel = addons.getChannel();
  const [currentTheme, setCurrentTheme] = React.useState(
    Array.isArray(theme) ? theme[0].theme : theme
  );

  const Provider = provider || ThemeProvider;

  React.useEffect(() => {
    channel.on('storybook-addon-theme-playground/updateTheme', t =>
      setCurrentTheme(t)
    );
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

  return <Provider theme={currentTheme}>{story()}</Provider>;
};
