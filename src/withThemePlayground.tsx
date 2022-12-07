import React, { useMemo } from 'react';
import addons, {
  makeDecorator,
  useCallback,
  useEffect,
  useState
} from '@storybook/addons';
import { useAddonState } from '@storybook/client-api';
import { logger } from '@storybook/client-logger';

import { ConfigProps, ControlsProps, PanelState } from './types';
import {
  THEME_PLAYGROUND_RESET,
  THEME_PLAYGROUND_STATE,
  THEME_PLAYGROUND_UPDATE
} from './constants';

import { getThemeComponents } from './helper/buildThemeComponents';

export interface ThemePlaygroundProps<T = undefined> {
  theme: T;
  provider: (props: { children: any; name?: string; theme?: any }) => any;
  overrides?: ControlsProps;
  controls?: ControlsProps;
  config?: ConfigProps;
  disabled?: boolean;
}

const defaultOptions: ThemePlaygroundProps<undefined> = {
  theme: undefined,
  controls: undefined,
  config: undefined,
  disabled: false,
  provider: ({ children }) => children
};

const getThemeArray = (theme) => {
  if (typeof theme === 'undefined') {
    return [];
  }

  return Array.isArray(theme) ? theme : [{ name: 'Default Theme', theme }];
};

export const withThemePlayground = makeDecorator({
  name: 'withThemePlayground',
  parameterName: 'themePlayground',
  skipIfNoParametersOrOptions: true,
  wrapper: (storyFn, context, { parameters, options }) => {
    const initialConfig = parameters || options;

    if (!parameters && options.theme) {
      logger.warn(
        'storybook-addon-theme-playground: Seems that you passed the options directly to the decorator, please use the themePlayground parameter instead. Using decorator options will be deprecated soon.'
      );
      logger.warn(
        'Learn more about how to configure the addon: https://github.com/jeslage/storybook-addon-theme-playground#readme'
      );
    }

    if (initialConfig.overrides) {
      logger.warn(
        'storybook-addon-theme-playground: Using the overrides key inside parameters is deprecated and will be removed in future releases. Please use controls key instead.'
      );
      logger.warn(
        'Learn more about how to configure controls: https://github.com/jeslage/storybook-addon-theme-playground#controls'
      );
    }

    const { theme, controls, overrides, config, provider } = {
      ...defaultOptions,
      ...initialConfig
    };

    const channel = addons.getChannel();

    if (!provider) {
      logger.warn(
        'storybook-addon-theme-playground: Missing ThemeProvider in themePlayground parameters.'
      );
    }

    if (!theme) {
      logger.warn(
        'storybook-addon-theme-playground: Missing theme key in themePlayground parameters.'
      );
    }

    const initialState: PanelState = {
      selected: 0,
      theme: getThemeArray(theme),
      themeComponents: useMemo(() => getThemeComponents(theme, controls), []),
      controls: controls || overrides,
      config: {
        labelFormat: 'startCase',
        debounce: true,
        debounceRate: 500,
        showCode: true,
        ...config
      }
    };

    const [state, setState] = useAddonState<PanelState>(
      THEME_PLAYGROUND_STATE,
      { ...initialState }
    );

    const [providerTheme, setProviderTheme] = useState(
      state.theme.length > 0 ? state.theme[state.selected] : undefined
    );

    const handleReset = useCallback((i) => {
      setState({
        ...initialState,
        selected: i
      });
    }, []);

    const handleUpdate = (newTheme) => setProviderTheme(newTheme);

    useEffect(() => {
      channel.on(THEME_PLAYGROUND_RESET, handleReset);
      channel.on(THEME_PLAYGROUND_UPDATE, handleUpdate);

      return () => {
        channel.off(THEME_PLAYGROUND_RESET, handleReset);
        channel.off(THEME_PLAYGROUND_UPDATE, handleUpdate);
      };
    }, []);

    const Provider = provider;

    return (
      <Provider theme={providerTheme?.theme} name={providerTheme?.name}>
        {storyFn(context)}
      </Provider>
    );
  }
});
