import { styled } from '@storybook/theming';
import { getPrimaryColor, getSecondaryColor } from '../../helper/color';

const StyledSelect = styled.div`
  margin: 1.5em 0;

  label {
    display: flex;
    align-items: center;
    position: relative;
  }

  .select__label {
    flex-grow: 2;
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

  select {
    background: none;
    border: 1px solid ${({ theme }) => getPrimaryColor(theme)};
    outline: none;
    border-radius: 5px;
    margin: 0;
    appearance: none;
    font-size: 14px;
    color: inherit;
    font-family: inherit;
    padding: 5px 10px;
    padding-right: 30px;
    min-width: 200px;
  }

  select::-ms-expand {
    display: none;
  }

  .select__icon {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    pointer-events: none;

    &:before,
    &:after {
      position: absolute;
      content: '';
      top: 1px;
      width: 10px;
      height: 2px;
      border-radius: 1px;
      background: ${({ theme }) => getPrimaryColor(theme)};
    }

    &:before {
      left: -1px;
      transform: rotate(45deg);
      transform-origin: top left;
    }

    &:after {
      left: 1px;
      transform: rotate(-45deg);
      transform-origin: top right;
    }
  }
`;

export default StyledSelect;
