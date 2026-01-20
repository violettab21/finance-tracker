import type { InputHTMLAttributes } from 'react';
import { StyledErrorText, StyledInput } from './styles';
import { StyledFlexWrapper } from '../../styled/flex';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string | null;
}

export default function Input({ error, ...props }: InputProps) {
  return (
    <StyledFlexWrapper direction="column">
      <StyledInput error={error} {...props}></StyledInput>
      {error && <StyledErrorText>{error}</StyledErrorText>}
    </StyledFlexWrapper>
  );
}
