import { styled } from '@storybook/theming';
import {
  getCodeBackground,
  getPrimaryColor,
  getTextColor,
  getSecondaryColor
} from '../../helper/color';

const StyledCode = styled.div`
  position: relative;

  code {
    margin: 0.5rem 0 0;
    border-radius: 5px;
    width: 100%;
    background: ${({ theme }) => getCodeBackground(theme)};
    color: ${({ theme }) => getPrimaryColor(theme)};
  }

  pre {
    margin: 0;
    padding: 1rem;
  }

  button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    outline: none;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
    color: ${({ theme }) => getTextColor(theme)};
    background: ${({ theme }) => getPrimaryColor(theme)};

    &:active {
      background: ${({ theme }) => getSecondaryColor(theme)};
      color: ${({ theme }) => getTextColor(theme)};
    }

    &:disabled {
      opacity: 1;
    }
  }
`;

export default StyledCode;
