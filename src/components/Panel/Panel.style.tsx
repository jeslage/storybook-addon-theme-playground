import { styled } from '@storybook/theming';

const StyledPanel = styled.div`
  height: calc(100% - 2rem);
  margin: 0;
  display: flex;
  flex-direction: column;

  .panel__content {
    flex-grow: 2;
  }

  .panel__themes {
    padding: 1rem;
    min-height: 55px;
    background: ${props => props.theme.background.app};
  }
`;

export default StyledPanel;
