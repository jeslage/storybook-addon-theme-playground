import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper';

interface LoadingProps {
  readonly isLoading: boolean;
}

const StyledLoading = styled.div<LoadingProps>`
  position: sticky;
  display: ${props => (props.isLoading ? 'inline-flex' : 'none')};
  align-items: center;
  justify-content: center;
  bottom: 1rem;
  background: ${props => props.theme.background.app};
  border: 1px solid ${props => props.theme.color.border};
  color: ${({ theme }) => getPrimaryColor(theme)};
  border-radius: 5px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  padding: 0.5rem;

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
