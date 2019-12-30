import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper/color';

const StyledTextarea = styled.label`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1.5em;

  p {
    flex-grow: 2;
  }

  textarea {
    width: 100%;
    height: 80px;
    appeareance: none;
    resize: none;
    background: none;
    padding: 5px;
    max-width: 200px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => getPrimaryColor(theme)};
    color: ${({ theme }) => getPrimaryColor(theme)};
  }
`;

export default StyledTextarea;
