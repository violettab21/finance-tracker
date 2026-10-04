import type { InputHTMLAttributes } from 'react';
import { StyledErrorText, StyledInput, StyledInputWrapper } from './styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string | null;
}

export default function Input({ error, ...props }: InputProps) {
  return (
    <StyledInputWrapper>
      <StyledInput error={error} {...props}></StyledInput>
      {error && <StyledErrorText>{error}</StyledErrorText>}
    </StyledInputWrapper>
  );
}
