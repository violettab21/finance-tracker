import { StyledButton } from './styles';
import type { ButtonProps } from './types';

export default function Button({
  children,
  onClick,
  primary,
  secondary,
}: ButtonProps) {
  return (
    <StyledButton $primary={primary} $secondary={secondary} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
