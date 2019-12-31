import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper/color';

const StyledInput = styled.label`
  display: flex;
  margin: 1.5em 0;

  input {
    width: 100%;
    border: none;
    appeareance: none;
    resize: none;
    background: none;
    padding: 0 0 10px;
    text-align: right;
    max-width: 200px;
    border-bottom: 1px solid ${({ theme }) => getPrimaryColor(theme)};
    color: ${({ theme }) => getPrimaryColor(theme)};
    outline: none;
  }
`;

export default StyledInput;
