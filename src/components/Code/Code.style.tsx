import { styled } from '@storybook/theming';
import { getTextColor, getBorderColor } from '../../helper';

const StyledCode = styled.div`
  margin: 1.5rem 1rem;

  .code__wrapper {
    position: relative;
  }

  code {
    margin: 0;
    border-radius: 5px;
    width: 100%;
    background: none;
    border: 1px solid ${({ theme }) => getBorderColor(theme)};
    color: ${({ theme }) => getTextColor(theme)};
  }

  pre {
    margin: 0;
    padding: 1rem;
    font-size: 14px;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    outline: none;
    border: none;
    padding: 5px 10px;
    border-radius: 0px 5px 0px 5px;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
    background: none;
    color: ${({ theme }) => getTextColor(theme)};
    border: 1px solid ${({ theme }) => getBorderColor(theme)};

    &:active {
      color: ${({ theme }) => getTextColor(theme)};
    }

    &:disabled {
      opacity: 1;
    }
  }
`;

export default StyledCode;
