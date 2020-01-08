import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper';

interface LoadingProps {
  readonly isLoading: boolean;
}

const StyledLoading = styled.div<LoadingProps>`
  pointer-events: none;
  display: inline-flex;
  visibility: ${props => (props.isLoading ? 'visible' : 'hidden')};
  align-items: center;
  padding: 0.5rem;
  flex-grow: 2;

  div {
    display: block;
    width: 12px;
    height: 12px;
    margin: 0;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => getPrimaryColor(theme)};
    border-color: ${({ theme }) => getPrimaryColor(theme)} transparent
      ${({ theme }) => getPrimaryColor(theme)} transparent;
    animation: loading 1.2s linear infinite;
  }

  span {
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 0.5rem;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default StyledLoading;
