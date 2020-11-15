import React, { useMemo } from 'react';
import addons, {
  makeDecorator,
  useCallback,
  useEffect,
  useState,
} from '@storybook/addons';
import { useAddonState } from '@storybook/client-api';

import { ConfigProps, OverridesProps, PanelState } from './types';
import {
  THEME_PLAYGROUND_RESET,
  THEME_PLAYGROUND_STATE,
  THEME_PLAYGROUND_UPDATE,
} from './constants';

import { getThemeComponents } from './helper/buildThemeComponents';

export interface ThemePlaygroundProps {
  theme: any;
  provider: any;
  overrides?: OverridesProps;
  config?: ConfigProps;
}

const getThemeArray = (theme) => {
  return Array.isArray(theme) ? theme : [{ name: 'Default Theme', theme }];
};

export default makeDecorator({
  name: 'withThemePlayground',
  parameterName: 'themePlayground',
  skipIfNoParametersOrOptions: true,
  wrapper: (storyFn, context, { options }) => {
    const { theme, overrides, config, provider } = options;

    const channel = addons.getChannel();

    if (!provider) {
      throw Error(
        'Missing ThemeProvider in withThemePlayground decorator options.'
      );
    }

    if (!theme) {
      throw Error(
        'Missing theme key in withThemePlayground decorator options.'
      );
    }

    const initialState: PanelState = {
      selected: 0,
      theme: getThemeArray(theme),
      themeComponents: useMemo(() => getThemeComponents(theme, overrides), []),
      overrides,
      config: {
        labelFormat: 'startCase',
        debounce: true,
        debounceRate: 500,
        showCode: true,
        ...config,
      },
    };

    const [state, setState] = useAddonState<PanelState>(
      THEME_PLAYGROUND_STATE,
      { ...initialState }
    );

    const [providerTheme, setProviderTheme] = useState(
      state.theme[state.selected].theme
    );

    const handleReset = useCallback((i) => {
      setState({
        ...state,
        selected: i,
        theme: getThemeArray(theme),
        themeComponents: getThemeComponents(theme, overrides),
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

    return <Provider theme={providerTheme}>{storyFn(context)}</Provider>;
  },
});
