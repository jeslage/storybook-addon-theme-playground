import * as React from 'react';

import { SettingsContext } from '../../contexts/SettingsProvider';

import Code from '../Code/Code';
import SettingsItem from '../SettingsItem/SettingsItem';
import Select from '../Select/Select';

import StyledPanel from './Panel.style';

const Panel = () => {
  const { theme, themes, activeTheme, updateActiveTheme } = React.useContext(
    SettingsContext
  );

  return (
    <StyledPanel>
      {theme && Object.entries(theme).length > 0 && (
        <>
          <div className="panel__content">
            {themes.length > 1 && (
              <Select
                label="Active theme"
                initialValue={activeTheme}
                onChange={val => {
                  updateActiveTheme(themes.filter(t => t.name === val)[0]);
                }}
                options={themes.map(t => ({ value: t.name }))}
              />
            )}
            <SettingsItem obj={theme} arr={[]} />
          </div>
          <Code value={theme} />
        </>
      )}
    </StyledPanel>
  );
};

export default Panel;
