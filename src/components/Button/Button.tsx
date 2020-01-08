import * as React from 'react';

import StyledButton from './Button.style';

export type ButtonProps = { onClick: () => void };

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <StyledButton type="button" onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;
