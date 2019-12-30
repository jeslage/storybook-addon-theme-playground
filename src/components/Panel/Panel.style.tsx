import { styled } from '@storybook/theming';

const StyledPanel = styled.div`
  height: calc(100% - 2rem);
  margin: 1rem 1rem;
  display: flex;
  flex-direction: column;

  .panel__content {
    flex-grow: 2;
  }
`;

export default StyledPanel;
