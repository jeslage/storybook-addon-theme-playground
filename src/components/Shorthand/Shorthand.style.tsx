import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper';

const StyledShorthand = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

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
    margin: 0 0 0 10px;
    font-size: 14px;
    font-family: inherit;
    text-align: center;
    color: inherit;
    background: none;
  }
`;

export default StyledShorthand;
