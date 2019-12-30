import { styled } from "@storybook/theming";
import { getSecondaryColor, getPrimaryColor } from "../../helper/color";

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

  .radioGroup__icon {
    display: flex;
    align-items: center;
    padding: 5px;
    margin: 0 0 0 10px;
    border-radius: 5px;
    opacity: 0.5;

    svg {
      width: 20px;
      height: auto;
      fill: ${({ theme }) => getPrimaryColor(theme)};
    }
  }

  .radioGroup__radio {
    cursor: pointer;

    input {
      display: none;
    }

    input:checked + .radioGroup__icon {
      opacity: 1;
    }
  }
`;

export default StyledRadioGroup;
