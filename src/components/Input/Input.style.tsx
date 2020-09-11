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
  max-width: 200px;
  width: 100%;
  border: 1px solid ${getBorderColor};
  color: ${getPrimaryColor};
  outline: none;
`;

export default StyledInput;
