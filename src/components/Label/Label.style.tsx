import { styled } from '@storybook/theming';

const StyledLabel = styled.div`
  flex-grow: 2;
  padding-right: 20px;

  .label {
    margin: 0;
    display: flex;
    font-size: 14px;
    align-items: center;
    hyphens: auto;

    svg {
      width: 15px;
      height: auto;
      margin-right: 5px;
    }
  }

  .description {
    margin: 0;
    margin-top: 10px;
  }
`;

export default StyledLabel;
