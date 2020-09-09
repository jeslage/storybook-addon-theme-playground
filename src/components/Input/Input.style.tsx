import { styled } from '@storybook/theming';
import { getPrimaryColor, getBorderColor } from '../../helper';

const StyledInput = styled.input`
  width: 100%;
  border: none;
  appearance: none;
  resize: none;
  background: none;
  padding: 8px 10px;
  border-radius: 5px;
  text-align: right;
  width: 195px;
  border: 1px solid ${getBorderColor};
  color: ${getPrimaryColor};
  outline: none;
`;

export default StyledInput;
