import * as React from 'react';

import SettingsItem from '../SettingsItem/SettingsItem';
import Select from '../Select/Select';

import StyledPanel from './Panel.style';
import { SettingsContext } from '../../contexts/SettingsProvider';
import Code from '../Code/Code';

const Panel = () => {
  const { theme, themes, activeTheme, updateActiveTheme } = React.useContext(
    SettingsContext
  );

  return (
    <StyledPanel>
      {themes.length > 1 && (
        <>
          <Select
            label="Active theme"
            initialValue={activeTheme}
            onChange={val => {
              updateActiveTheme(themes.filter(t => t.name === val)[0]);
            }}
            options={themes.map(t => ({ value: t.name }))}
          />

          <hr />
        </>
      )}

      {theme && Object.entries(theme).length > 0 && (
        <>
          <SettingsItem obj={theme} arr={[]} />
          <Code value={theme} />
        </>
      )}
    </StyledPanel>
  );
};

export default Panel;
