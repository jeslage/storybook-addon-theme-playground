import React, { useEffect, useState } from 'react';
import { API, useAddonState } from '@storybook/api';
import {
  Icons,
  SyntaxHighlighter,
  Tabs,
  IconButton
} from '@storybook/components';

import { updateValueBasedOnPath } from '../helper';

import {
  THEME_PLAYGROUND_RESET,
  THEME_PLAYGROUND_STATE,
  THEME_PLAYGROUND_UPDATE
} from '../constants';

import { PanelState } from '../types';

import ThemeControls from './ThemeControls';
import Loading from './Loading';

type PanelProps = { api: API };

const Panel = ({ api }: PanelProps) => {
  const [state, setState] = useAddonState<PanelState>(THEME_PLAYGROUND_STATE);

  const [isLoading, setIsLoading] = useState(false);

  const updateSelectedTheme = (i: number) => {
    setState({ ...(state || {}), selected: i });
  };

  useEffect(() => {
    if (state.config.debounce) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        api.emit(THEME_PLAYGROUND_UPDATE, state.theme[state.selected].theme);
      }, state.config.debounceRate);

      return () => {
        setIsLoading(true);
        clearTimeout(timeout);
      };
    } else {
      if (isLoading) {
        setIsLoading(false);
      }
      api.emit(THEME_PLAYGROUND_UPDATE, state.theme[state.selected].theme);
    }
  }, [state.themeComponents]);

  useEffect(() => {
    api.emit(THEME_PLAYGROUND_UPDATE, state.theme[state.selected].theme);
  }, [state.selected]);

  const updateTheme = (path: string, value: any) => {
    const { theme, name } = state.theme[state.selected];

    const newTheme = theme;
    updateValueBasedOnPath(path, value, newTheme);

    setState({
      ...(state || {}),
      theme: state.theme.map((prev, index) => {
        if (index === state.selected) {
          return {
            ...prev,
            theme: newTheme
          };
        }

        return prev;
      }),
      themeComponents: {
        ...state.themeComponents,
        [name]: {
          ...state.themeComponents[name],
          [path]: { ...state.themeComponents[name][path], value }
        }
      }
    });
  };

  const resetThemes = () => {
    api.emit(THEME_PLAYGROUND_RESET, state.selected);
  };

  return (
    <>
      <Tabs
        backgroundColor="rgba(0,0,0,.02)"
        selected={state.selected.toString()}
        actions={{
          onSelect: (id) => updateSelectedTheme(parseFloat(id))
        }}
        tools={
          <>
            {isLoading && <Loading />}

            <IconButton title="Reset theme" onClick={resetThemes}>
              <Icons icon="sync" />
            </IconButton>
          </>
        }
      >
        {state.theme.map((t, i) => (
          <div
            id={i.toString()}
            // Dont render a tab title if is only one theme
            title={state.theme.length > 1 ? t.name : ''}
            key={t.name}
          >
            {({ active }) =>
              active ? (
                <React.Fragment key={t.name}>
                  <ThemeControls
                    themeComponents={state.themeComponents[t.name]}
                    overrides={state.overrides}
                    config={state.config}
                    onUpdate={updateTheme}
                  />

                  {state.config.showCode && (
                    <SyntaxHighlighter
                      language="json"
                      copyable
                      showLineNumbers
                      padded
                      bordered
                    >
                      {JSON.stringify(t.theme, null, 2)}
                    </SyntaxHighlighter>
                  )}
                </React.Fragment>
              ) : null
            }
          </div>
        ))}
      </Tabs>
    </>
  );
};

export default React.memo(Panel);
