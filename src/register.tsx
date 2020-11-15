/* eslint-disable react/display-name */
import React from 'react';
import addons from '@storybook/addons';

import { AddonPanel, Loader } from '@storybook/components';

import { useAddonState } from '@storybook/api';

import Panel from './components/Panel';

import {
  THEME_PLAYGROUND,
  THEME_PLAYGROUND_PANEL,
  THEME_PLAYGROUND_STATE,
} from './constants';

addons.register(THEME_PLAYGROUND, (api) => {
  addons.addPanel(THEME_PLAYGROUND_PANEL, {
    title: 'Theme Playground',
    render: ({ active, key }) => {
      const [state] = useAddonState(THEME_PLAYGROUND_STATE);

      return (
        <AddonPanel key={key} active={active || false}>
          {!state ? <Loader size={32} /> : <Panel api={api} />}
        </AddonPanel>
      );
    },
  });
});
