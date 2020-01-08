import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper';

const StyledInput = styled.label`
  display: flex;
  align-items: center;
  width: 100%;

  input {
    width: 100%;
    border: none;
    appeareance: none;
    resize: none;
    background: none;
    padding: 10px;
    border-radius: 5px;
    text-align: right;
    max-width: 200px;
    border: 1px solid ${({ theme }) => getPrimaryColor(theme)};
    color: ${({ theme }) => getPrimaryColor(theme)};
    outline: none;
  }
`;

export default StyledInput;
