import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper/color';

interface LoadingProps {
  readonly loading: boolean;
}

const StyledLoading = styled.div<LoadingProps>`
  position: sticky;
  display: ${props => (props.loading ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  bottom: 1rem;
  width: 40px;
  height: 40px;
  background: ${props => props.theme.background.app};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: 5px;
  left: 1rem;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;

  div {
    display: block;
    width: 20px;
    height: 20px;
    margin: 0;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => getPrimaryColor(theme)};
    border-color: ${({ theme }) => getPrimaryColor(theme)} transparent
      ${({ theme }) => getPrimaryColor(theme)} transparent;
    animation: loading 1.2s linear infinite;
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
