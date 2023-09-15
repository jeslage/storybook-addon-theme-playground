import React from "react";

import {
  useChannel,
  useParameter,
  useState,
  useCallback,
  useEffect,
} from "@storybook/preview-api";

import type {
  Renderer,
  PartialStoryFn as StoryFunction,
} from "@storybook/types";

import { logger } from "@storybook/client-logger";

import { EVENTS, PARAM_KEY } from "./constants";
import { PanelState, ThemePlaygroundProps } from "./types";

export const defaultOptions: ThemePlaygroundProps = {
  theme: undefined,
  controls: undefined,
  config: undefined,
  disabled: false,
  provider: ({ children }) => children,
};

const getThemeArray = (theme?: any | any[]) => {
  if (typeof theme === "undefined") return [];
  return Array.isArray(theme) ? theme : [{ name: "Default Theme", theme }];
};

export const withThemePlayground = (storyFn: StoryFunction<Renderer>) => {
  const { theme, controls, config, provider } = useParameter(
    PARAM_KEY,
    defaultOptions
  );

  if (!provider) {
    logger.warn(
      "storybook-addon-theme-playground: Missing ThemeProvider in themePlayground parameters."
    );
  }

  if (!theme) {
    logger.warn(
      "storybook-addon-theme-playground: Missing theme key in themePlayground parameters."
    );
  }

  const initialState: PanelState = {
    initialized: true,
    selected: 0,
    loading: false,
    theme: getThemeArray(theme),
    controls,
    config: {
      labelFormat: "startCase",
      debounce: true,
      debounceRate: 500,
      showCode: true,
      ...config,
    },
  };

  const [state, setState] = useState(initialState);

  const [currentTheme, setCurrentTheme] = useState(
    state.theme.length > 0 ? state.theme[state.selected] : undefined
  );

  const handleReset = useCallback(
    (i: number) => setState({ ...initialState, selected: i }),
    []
  );

  const emit = useChannel({
    [EVENTS.RESET]: handleReset,
    [EVENTS.UPDATE]: setCurrentTheme,
  });

  useEffect(() => {
    emit(EVENTS.INIT, initialState);
  }, []);

  const Provider = provider;

  return (
    <Provider theme={currentTheme?.theme} name={currentTheme?.name}>
      {storyFn()}
    </Provider>
  );
};
