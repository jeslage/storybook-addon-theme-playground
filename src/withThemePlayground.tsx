import React, { CSSProperties } from "react";

import {
  useChannel,
  useParameter,
  useState,
  useCallback,
  useEffect,
  useStoryContext,
} from "@storybook/preview-api";

import type {
  Renderer,
  PartialStoryFn as StoryFunction,
} from "@storybook/types";

import { logger } from "@storybook/client-logger";

import { EVENTS, PARAM_KEY } from "./constants";
import { ConfigProps, PanelState, ThemePlaygroundProps } from "./types";
import { log } from "console";
import { background, color, styled } from "@storybook/theming";

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

const Wrapper = styled.div<{ showDiff: boolean }>`
  display: ${(props) => (props.showDiff ? "grid" : "block")};
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;

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
      showDiff: false,
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

  const handleConfigUpdate = useCallback((config: Partial<ConfigProps>) => {
    setState((prev) => ({ ...prev, config: { ...prev.config, ...config } }));
  });

  const emit = useChannel({
    [EVENTS.RESET]: handleReset,
    [EVENTS.UPDATE_THEME]: setCurrentTheme,
    [EVENTS.UPDATE_CONFIG]: handleConfigUpdate,
  });

  useEffect(() => {
    emit(EVENTS.INIT, initialState);
  }, []);

  const Provider = provider;

  return (
    <Wrapper showDiff={state.config.showDiff}>
      <Provider theme={currentTheme?.theme} name={currentTheme?.name}>
        {storyFn()}
      </Provider>

      {state.config.showDiff && (
        <Provider
          theme={initialState.theme[state.selected]?.theme}
          name={initialState.theme[state.selected]?.name}
        >
          {storyFn()}
        </Provider>
      )}
    </Wrapper>
  );
};
