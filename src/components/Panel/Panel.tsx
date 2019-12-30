import * as React from 'react';

import SettingsItem from '../SettingsItem/SettingsItem';
import Select from '../Select/Select';

import StyledPanel from './Panel.style';
import { SettingsContext } from '../../contexts/SettingsProvider';

const Panel = () => {
  const { theme, themes, activeTheme, updateActiveTheme } = React.useContext(
    SettingsContext
  );

  return (
    <StyledPanel>
      {themes.length > 0 && (
        <>
          <Select
            label="Active theme"
            initialValue={activeTheme}
            onChange={val => updateActiveTheme(val)}
            options={themes.map(t => ({ value: t.name }))}
          />
          <hr />
        </>
      )}

      {theme && <SettingsItem obj={theme} arr={[]} />}
    </StyledPanel>
  );
};

export default Panel;
