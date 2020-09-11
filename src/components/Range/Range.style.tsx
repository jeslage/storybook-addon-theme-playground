import { styled } from '@storybook/theming';
import { getSecondaryColor, getPrimaryColor } from '../../helper';

const StyledRange = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  span {
    margin-right: 10px;
    font-size: 14px;
    white-space: nowrap;
  }

  input[type='number'] {
    border: none;
    border-bottom: 1px solid transparent;
    outline: none;
    display: inline-block;
    max-width: 30px;
    font-size: inherit;
    padding: 5px 2px 4px;
    font-family: inherit;
    text-align: right;
    color: inherit;
    background: none;
    -moz-appearance: textfield;

    &:focus {
      border-color: ${getSecondaryColor};
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  input[type='range'] {
    appearance: none;
    max-width: 120px;
    width: 100%;
    margin: 0;
    background: none;
  }

  input[type='range']:focus {
    outline: none;
  }

  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: ${getSecondaryColor};
    border-radius: 2px;
  }

  input[type='range']::-moz-range-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: ${getSecondaryColor};
    border-radius: 2px;
  }

  input[type='range']::-ms-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: ${getSecondaryColor};
    border-radius: 2px;
  }

  input[type='range']::-ms-thumb {
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background: ${getPrimaryColor};
    cursor: pointer;
    appearance: none;
    margin-top: -8px;
  }

  input[type='range']::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background: ${getPrimaryColor};
    cursor: pointer;
    appearance: none;
    margin-top: -8px;
  }

  input[type='range']::-webkit-slider-thumb {
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background: ${getPrimaryColor};
    cursor: pointer;
    appearance: none;
    margin-top: -8px;
  }
`;

export default StyledRange;
