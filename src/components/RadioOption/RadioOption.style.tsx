import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper';

const StyledRadioOption = styled.label`
  position: relative;
  cursor: pointer;
  font-weigt: bold;
  font-size: 12px;

  input {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    visibility: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap; /* added line */
  }

  div {
    display: flex;
    align-items: center;
    padding: 5px;
    margin: 0 0 0 10px;
    border-radius: 5px;
    color: ${({ theme }) => getPrimaryColor(theme)};
    border: 1px solid ${({ theme }) => getPrimaryColor(theme)};
    opacity: 0.5;
    pointer-events: none;

    svg {
      width: 20px;
      height: auto;
      fill: ${({ theme }) => getPrimaryColor(theme)};
    }
  }

  input:checked + div {
    opacity: 1;
  }
`;

export default StyledRadioOption;
