import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper';

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 80px;
  appearance: none;
  resize: none;
  background: none;
  padding: 5px;
  max-width: 200px;
  border-radius: 5px;
  border: 1px solid ${getPrimaryColor};
  color: ${getPrimaryColor};
`;

export default StyledTextarea;
