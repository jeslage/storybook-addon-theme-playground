import React from 'react';
import { styled } from '@storybook/theming';
import { Loader } from '@storybook/components';

const StyledLoading = styled.div`
  pointer-events: none;
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  flex-grow: 2;
  margin-right: 1rem;
  z-index: 999;

  & > div {
    position: relative;
    top: 3px;
    left: 4px;
  }

  span {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const Loading = () => {
  return (
    <StyledLoading>
      <span>Updating</span>
      <Loader size={12} />
    </StyledLoading>
  );
};

export default Loading;
