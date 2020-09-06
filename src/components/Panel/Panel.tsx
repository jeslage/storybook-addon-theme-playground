import React, { useContext } from 'react';

import { Icons } from '@storybook/components';

import { SettingsContext } from '../../contexts/SettingsProvider';

import Code from '../Code/Code';
import SettingsItem from '../SettingsItem/SettingsItem';
import Loading from '../Loading/Loading';
import RadioGroup from '../RadioGroup/RadioGroup';

import StyledPanel from './Panel.style';
import Button from '../Button/Button';

const Panel = () => {
  const {
    themes,
    activeTheme: { theme, name },
    updateActiveTheme,
    config,
    resetThemes,
  } = useContext(SettingsContext);

  return (
    <StyledPanel>
      {Object.entries(theme).length > 0 && (
        <>
          <div className="panel__content">
            {themes.length > 1 && (
              <div className="panel__themes">
                <RadioGroup
                  label="Active Theme"
                  name="themes"
                  value={name}
                  onChange={(val) =>
                    updateActiveTheme(themes.filter((t) => t.name === val)[0])
                  }
                  options={themes.map((t) => ({
                    label: t.name,
                    value: t.name,
                  }))}
                />
              </div>
            )}
            <SettingsItem />
            {config.showCode && <Code value={theme} />}
            <div className="panel__settings-wrapper">
              <div className="panel__settings">
                <Loading />
                <div className="panel__buttons">
                  <Button onClick={() => resetThemes()}>
                    <Icons icon="undo" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </StyledPanel>
  );
};

export default Panel;
