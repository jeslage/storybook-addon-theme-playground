import { styled } from '@storybook/theming';
import {
  getInverseTextColor,
  getPrimaryColor,
  getTextColor,
  getSecondaryColor,
  getCodeBackground
} from '../../helper/color';

const StyledCode = styled.div`
  position: relative;

  code {
    margin: 0.5rem 0 0;
    border-radius: 5px;
    width: 100%;
    background: ${({ theme }) => getCodeBackground(theme)};
    color: ${({ theme }) => getTextColor(theme)};
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
    color: ${({ theme }) => getInverseTextColor(theme)};
    background: ${({ theme }) => getPrimaryColor(theme)};

    &:active {
      color: ${({ theme }) => getInverseTextColor(theme)};
    }

    &:disabled {
      opacity: 1;
    }
  }
`;

export default StyledCode;
