import * as React from 'react';

import StyledButton from './Button.style';

const Button: React.FC = ({ children }) => (
  <StyledButton type="button">{children}</StyledButton>
);

export default Button;
