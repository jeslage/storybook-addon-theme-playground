import React from 'react';

import {
  useState,
  useEffect,
  useCallback,
  useChannel
} from '@storybook/preview-api';

import { logger } from '@storybook/client-logger';
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext
} from '@storybook/types';

import { ConfigProps, ControlsProps, PanelState } from './types';
import {
  THEME_PLAYGROUND_INIT,
  THEME_PLAYGROUND_PARAMETER_KEY,
  THEME_PLAYGROUND_RESET,
  THEME_PLAYGROUND_UPDATE
} from './constants';

export interface ThemePlaygroundProps<T = undefined> {
  theme: T;
  provider: (props: { children: any; name?: string; theme?: any }) => any;
  controls?: ControlsProps;
  config?: ConfigProps;
  disabled?: boolean;
}

export const defaultOptions: ThemePlaygroundProps<undefined> = {
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

export const withThemePlayground = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>
) => {
  const { parameters } = context;
  const initialConfig =
    parameters[THEME_PLAYGROUND_PARAMETER_KEY] || defaultOptions;

  const { theme, controls, config, provider } = {
    ...defaultOptions,
    ...initialConfig
  } as ThemePlaygroundProps;

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
    loading: false,
    theme: getThemeArray(theme),
    controls,
    config: {
      labelFormat: 'startCase',
      debounce: true,
      debounceRate: 500,
      showCode: true,
      ...config
    }
  };

  const [state, setState] = useState(initialState);

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

  const emit = useChannel({
    [THEME_PLAYGROUND_RESET]: handleReset,
    [THEME_PLAYGROUND_UPDATE]: handleUpdate
  });

  useEffect(() => {
    emit(THEME_PLAYGROUND_INIT, initialState);
  }, []);

  const Provider = provider;

  return (
    <Provider theme={providerTheme?.theme} name={providerTheme?.name}>
      {StoryFn()}
    </Provider>
  );
};
