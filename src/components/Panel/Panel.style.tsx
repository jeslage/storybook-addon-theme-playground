import { styled } from '@storybook/theming';

const StyledPanel = styled.div`
  height: calc(100% - 2rem);
  margin: 0;
  display: flex;
  flex-direction: column;

  .panel__content {
    position: relative;
    flex-grow: 2;
  }

  .panel__themes {
    padding: 1rem;
    min-height: 65px;
    background: ${props => props.theme.background.app};
  }

  .panel__settings-wrapper {
    position: sticky;
    bottom: -1px;
    left: 0;
    display: flex;
    justify-content: flex-end;
    z-index: 100;
  }

  .panel__settings {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
  }

  .panel__buttons {
    border-radius: 1rem 0 0 0;
    background: ${props => props.theme.background.content};
    border-top: 1px solid ${props => props.theme.color.border};
    border-left: 1px solid ${props => props.theme.color.border};
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    padding: 0 0.75rem;
  }
`;

export default StyledPanel;
