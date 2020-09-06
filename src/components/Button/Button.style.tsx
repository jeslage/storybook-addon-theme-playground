import { styled } from '@storybook/theming';
import {
  getPrimaryColor,
  getInverseTextColor,
  getBorderColor,
} from '../../helper';

const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  margin: 0.5rem 0.25rem;
  border: 0;
  border-radius: 3em;
  padding: 0.75rem 1rem;
  text-align: center;
  transition: all 150ms ease-out;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  color: ${getPrimaryColor};
  background: transparent;
  border: 1px solid ${getPrimaryColor};

  &:hover {
    background: ${getBorderColor};
    border-color: ${getBorderColor};
    color: ${getInverseTextColor};
  }

  &:active {
    color: ${getInverseTextColor};
    background: ${getPrimaryColor};
    color: ${getInverseTextColor};
  }

  svg {
    display: inline-block;
    height: 16px;
    width: 16px;
    vertical-align: top;
    margin-right: 6px;
    margin-top: -1px;
    margin-bottom: -1px;
    pointer-events: none;
  }
`;

export default StyledButton;
