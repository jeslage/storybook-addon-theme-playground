import { styled } from "@storybook/theming";
import { getPrimaryColor, getSecondaryColor } from "../../helper/color";

interface SwitchProps {
  readonly active: boolean;
}

const StyledSwitch = styled.div<SwitchProps>`
  display: flex;
  align-items: center;
  margin: 1.5em 0;

  .switch__label {
    flex-grow: 2;
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: ${({ theme }) => getPrimaryColor(theme)};

    svg {
      width: 20px;
      height: auto;
      margin-right: 15px;
      fill: ${({ theme }) => getSecondaryColor(theme)};
    }
  }

  button {
    position: relative;
    outline: none;
    margin: 0;
    padding: 0;
    appearance: none;
    border: 1px solid ${({ theme }) => getPrimaryColor(theme)};
    width: 60px;
    height: 30px;
    border-radius: 30px;
    cursor: pointer;
    background: transparent;

    span {
      position: absolute;
      top: 4px;
      left: 4px;
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background: ${({ theme }) => getPrimaryColor(theme)};
      transform: translateX(${props => (props.active ? "30px" : "0")});
      will-change: transform;
      transition: transform 0.2s ease-in-out;

      svg {
        fill: ${props => props.theme.background.app};
        fill-opacity: 0;
        stroke: ${props => props.theme.background.app};
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }
  }
`;

export default StyledSwitch;
