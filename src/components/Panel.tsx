import React, { Fragment, useEffect, useState } from 'react';
import { API, useAddonState, useParameter } from '@storybook/api';
import {
  Icons,
  SyntaxHighlighter,
  Tabs,
  IconButton,
  Placeholder,
  Link
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
import { ThemePlaygroundProps } from '../withThemePlayground';

type PanelProps = { api: API };

const Panel = ({ api }: PanelProps) => {
  const [state, setState] = useAddonState<PanelState>(THEME_PLAYGROUND_STATE);
  const parameters = useParameter<ThemePlaygroundProps>('themePlayground');

  const [isLoading, setIsLoading] = useState(false);

  const updateSelectedTheme = (i: number) => {
    setState({ ...(state || {}), selected: i });
  };

  useEffect(() => {
    if (state.theme.length > 0) {
      if (state.config.debounce) {
        const timeout = setTimeout(() => {
          setIsLoading(false);
          api.emit(THEME_PLAYGROUND_UPDATE, state.theme[state.selected]);
        }, state.config.debounceRate);

        return () => {
          setIsLoading(true);
          clearTimeout(timeout);
        };
      } else {
        if (isLoading) {
          setIsLoading(false);
        }
        api.emit(THEME_PLAYGROUND_UPDATE, state.theme[state.selected]);
      }
    }
  }, [state.themeComponents]);

  useEffect(() => {
    if (state.theme.length > 0) {
      api.emit(THEME_PLAYGROUND_UPDATE, state.theme[state.selected]);
    }
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

  if (state.theme.length === 0) {
    return (
      <Placeholder>
        <Fragment key="title">You have not configured the addon yet</Fragment>

        <Fragment key="desc">
          Read more about how to configure&nbsp;
          <Link
            href="https://github.com/jeslage/storybook-addon-theme-playground#readme"
            cancel={false}
          >
            the addon
          </Link>
        </Fragment>
      </Placeholder>
    );
  }

  if (parameters && parameters.disabled) {
    return (
      <Placeholder>
        <Fragment key="title">
          Theme Playground is disabled for this story
        </Fragment>
        <Fragment key="desc">
          Read more about how to configure&nbsp;
          <Link
            href="https://github.com/jeslage/storybook-addon-theme-playground#readme"
            cancel={false}
          >
            the addon
          </Link>
        </Fragment>
      </Placeholder>
    );
  }

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
                    controls={state.controls}
                    config={state.config}
                    onUpdate={updateTheme}
                  />

                  {state.config.showCode ? (
                    <SyntaxHighlighter
                      language="json"
                      copyable
                      showLineNumbers
                      padded
                      bordered
                    >
                      {JSON.stringify(t.theme, null, 2)}
                    </SyntaxHighlighter>
                  ) : null}
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
