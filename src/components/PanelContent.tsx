import React, { Fragment, useEffect, useState } from "react";
import { useAddonState, useChannel } from "@storybook/manager-api";
import {
  Icons,
  Tabs,
  IconButton,
  SyntaxHighlighter,
} from "@storybook/components";

import { ADDON_ID, EVENTS } from "../constants";
import { PanelState } from "../types";
import Loading from "./Loading";
import Controls from "./Controls";

interface PanelContentProps {}

export const PanelContent: React.FC<PanelContentProps> = () => {
  const [state, setState] = useAddonState<PanelState>(ADDON_ID);
  const [isLoading, setIsLoading] = useState(false);
  const emit = useChannel({});

  useEffect(() => {
    if (state.theme.length > 0) {
      if (state.config.debounce) {
        const timeout = setTimeout(() => {
          setIsLoading(false);
          emit(EVENTS.UPDATE_THEME, {
            index: state.selected,
            theme: state.theme[state.selected],
          });
        }, state.config.debounceRate);

        return () => {
          setIsLoading(true);
          clearTimeout(timeout);
        };
      } else {
        if (isLoading) setIsLoading(false);
        emit(EVENTS.UPDATE_THEME, {
          index: state.selected,
          theme: state.theme[state.selected],
        });
      }
    }
  }, [state.theme, state.selected]);

  const updateTheme = (i: number) => setState((p) => ({ ...p, selected: i }));
  const resetThemes = () => emit(EVENTS.RESET, state.selected);

  const toggleDiff = () => {
    setState((p) => ({
      ...p,
      config: { ...p.config, showDiff: !p.config.showDiff },
    }));
    emit(EVENTS.UPDATE_CONFIG, { showDiff: !state.config.showDiff });
  };

  return (
    <Tabs
      selected={state.selected.toString()}
      menuName="Theme Playground"
      actions={{
        onSelect: (id) => updateTheme(parseFloat(id)),
      }}
      tools={
        <>
          <IconButton
            active={state.config.showDiff}
            title={state.config.showDiff ? "Hide diff" : "Show diff"}
            onClick={toggleDiff}
          >
            <Icons icon="sidebyside" />
          </IconButton>

          {isLoading ? (
            <Loading />
          ) : (
            <IconButton title="Reset theme" onClick={resetThemes}>
              <Icons icon="sync" />
            </IconButton>
          )}
        </>
      }
    >
      {state.theme.map((t, i) => (
        <div
          id={i.toString()}
          // Dont render a tab title if is only one theme
          title={state.theme.length > 1 ? t.name : ""}
          key={t.name}
        >
          <Fragment>
            <Controls />

            {state.config.showCode ? (
              <SyntaxHighlighter
                language="json"
                copyable
                showLineNumbers
                padded
                key={t.name}
                bordered
              >
                {JSON.stringify(t.theme, null, 2)}
              </SyntaxHighlighter>
            ) : null}
          </Fragment>
        </div>
      ))}
    </Tabs>
  );
};
