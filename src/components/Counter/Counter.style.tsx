import { styled } from "@storybook/theming";
import { getPrimaryColor, getSecondaryColor } from "../../helper/color";

const StyledCounter = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5em 0;

  .counter__text {
    flex-grow: 2;
    padding-right: 20px;
  }

  .counter__label {
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

  .counter__description {
    margin: 0;
    margin-top: 10px;
  }

  .counter__counter {
    display: flex;
    align-items: center;
  }

  button {
    padding: 0;
    margin: 0;
    outline: none;
    background: none;
    border: 1px solid ${({ theme }) => getPrimaryColor(theme)};
    width: 30px;
    height: 30px;
    border-radius: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &[disabled] {
      opacity: 0.2;
      pointer-events: none;
    }

    svg {
      fill: ${({ theme }) => getPrimaryColor(theme)};
      width: 22px;
      height: 22px;
    }
  }

  span {
    margin: 0 5px;
  }

  input {
    border: none;
    border-bottom: 1px solid transparent;
    outline: none;
    display: inline-block;
    max-width: 60px;
    font-size: 14px;
    padding: 5px 10px 4px;
    font-family: inherit;
    text-align: center;
    color: inherit;
    background: none;

    &:focus {
      border-color: ${({ theme }) => getPrimaryColor(theme)};
    }
  }
`;

export default StyledCounter;
