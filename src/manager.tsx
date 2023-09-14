/* eslint-disable react/display-name */
import React from 'react';

import { Loader, ScrollArea } from '@storybook/components';
import {
  addons,
  types,
  useAddonState,
  useChannel
} from '@storybook/manager-api';

import Panel from './components/Panel';

import {
  THEME_PLAYGROUND,
  THEME_PLAYGROUND_INIT,
  THEME_PLAYGROUND_PANEL,
  THEME_PLAYGROUND_STATE
} from './constants';
import { PanelState } from './types';

addons.register(THEME_PLAYGROUND, () => {
  addons.add(THEME_PLAYGROUND_PANEL, {
    title: 'Theme Playground',
    type: types.PANEL,
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => {
      const [state, setState] = useAddonState<PanelState>(
        THEME_PLAYGROUND_STATE
      );

      useChannel({
        [THEME_PLAYGROUND_INIT]: (i) => setState(i)
      });

      if (!active) return null;

      return (
        <ScrollArea vertical>
          {!state ? <Loader size={32} /> : <Panel />}
        </ScrollArea>
      );
    }
  });
});
