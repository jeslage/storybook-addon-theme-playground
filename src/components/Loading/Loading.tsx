import * as React from 'react';

import { SettingsContext } from '../../contexts/SettingsProvider';

import StyledLoading from './Loading.style';

const Loading: React.FC = () => {
  const { loading } = React.useContext(SettingsContext);
  return (
    <StyledLoading loading={loading}>
      <div />
    </StyledLoading>
  );
};

export default Loading;
