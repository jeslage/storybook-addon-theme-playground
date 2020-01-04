import { styled } from '@storybook/theming';

export const StyledSettingsItem = styled.div`
  padding: 0.75em 1rem;
  min-height: 55px;

  &:nth-of-type(odd) {
    background: ${props => props.theme.background.app};
  }
`;
