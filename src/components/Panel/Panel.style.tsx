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
    min-height: 55px;
    background: ${props => props.theme.background.app};
  }

  .panel__settings {
    position: sticky;
    bottom: -1px;
    left: 0;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    z-index: 100;
    background: ${props => props.theme.background.content};
    border-top: 1px solid ${props => props.theme.color.border};
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  }

  .panel__reset {
    outline: none;
    background-color: ${props => props.theme.color.mediumlight};
    border: none;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5rem 1rem;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: ${props => props.theme.color.medium};
    }
  }
`;

export default StyledPanel;
