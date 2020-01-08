import * as React from 'react';

import { SettingsContext } from '../../contexts/SettingsProvider';

import StyledLoading from './Loading.style';

const Loading: React.FC = () => {
  const { isLoading } = React.useContext(SettingsContext);
  return (
    <StyledLoading isLoading={isLoading}>
      <div />
      <span>Updating</span>
    </StyledLoading>
  );
};

export default Loading;
