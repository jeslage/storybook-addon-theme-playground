/* eslint-disable react/display-name */
import React from 'react';
import addons from '@storybook/addons';

import { AddonPanel } from '@storybook/components';

import Panel from './components/Panel/Panel';
import SettingsProvider from './contexts/SettingsProvider';

addons.register('storybook-addon-theme-playground', (api) => {
  addons.addPanel('storybook-addon-theme-playground/panel', {
    title: 'Theme Playground',
    render: ({ active, key }) => (
      <AddonPanel key={key} active={active}>
        <SettingsProvider api={api}>
          <Panel />
        </SettingsProvider>
      </AddonPanel>
    ),
  });
});
