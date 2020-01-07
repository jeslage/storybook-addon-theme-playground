import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background: none;
  text-transform: uppercase;
  margin: 1em 0;
  padding: 12px 20px;
  text-align: center;
  font-weight: bold;
  font-size: 11px;
  cursor: pointer;
  border-radius: 30px;
  width: 100%;
  border: 1px solid ${({ theme }) => getPrimaryColor(theme)};
  color: ${({ theme }) => getPrimaryColor(theme)};

  &:active {
    color: ${({ theme }) => getPrimaryColor(theme)};
  }

  &[disabled] {
    opacity: 0.3;
  }

  svg {
    height: 15px;
    width: auto;
    fill: ${({ theme }) => getPrimaryColor(theme)};
  }
`;

export default StyledButton;
