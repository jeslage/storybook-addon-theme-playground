import { styled } from "@storybook/theming";
import { getSecondaryColor, getPrimaryColor } from "../../helper/color";

const StyledShorthand = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5em 0;

  .shorthand__text {
    flex-grow: 2;
    padding-right: 20px;
  }

  .shorthand__label {
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 14px;

    svg {
      width: 20px;
      height: auto;
      margin-right: 15px;
      fill: ${({ theme }) => getSecondaryColor(theme)};
    }
  }

  .shorthand__description {
    margin: 0;
    margin-top: 10px;
  }

  .shorthand__shorthand {
    display: flex;
    align-items: center;
  }

  input {
    border: 1px solid ${({ theme }) => getPrimaryColor(theme)};
    border-radius: 30px;
    outline: none;
    display: inline-block;
    max-width: 50px;
    padding: 5px 5px 4px;
    margin: 0 5px;
    font-size: 14px;
    font-family: inherit;
    text-align: center;
    color: inherit;
    background: none;
  }
`;

export default StyledShorthand;
