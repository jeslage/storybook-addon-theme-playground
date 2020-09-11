import { styled } from '@storybook/theming';

export const StyledSettingsItem = styled.div`
  padding: 0.75em 1rem;
  min-height: 65px;
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, auto));
  grid-gap: 10px;
  width: 100%;

  & > *:nth-child(2) {
    justify-self: flex-end;
  }

  &:nth-of-type(odd) {
    background: ${(props) => props.theme.background.app};
  }
`;
