import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper';

const StyledShorthand = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;

  input {
    border: 1px solid ${getPrimaryColor};
    border-radius: 30px;
    outline: none;
    display: inline-block;
    max-width: 50px;
    padding: 5px 5px 4px;
    margin: 2px 0 2px 4px;
    font-size: 14px;
    font-family: inherit;
    text-align: center;
    color: inherit;
    background: none;
  }
`;

export default StyledShorthand;
