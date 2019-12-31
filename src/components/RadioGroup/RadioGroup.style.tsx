import { styled } from '@storybook/theming';
import { getSecondaryColor } from '../../helper/color';

const StyledRadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5em 0;

  .radioGroup__label {
    flex-grow: 2;
    padding-right: 20px;
    margin: 0;
    display: flex;
    font-size: 14px;
    align-items: center;

    svg {
      width: 20px;
      height: auto;
      margin-right: 15px;
      fill: ${({ theme }) => getSecondaryColor(theme)};
    }
  }
`;

export default StyledRadioGroup;
