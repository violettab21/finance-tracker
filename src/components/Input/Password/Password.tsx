import { type InputHTMLAttributes } from 'react';
import { StyledPassword } from './styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { StyledFlexWrapper } from '../../../styled/flex';
import { StyledErrorText, StyledInput } from '../styles';

interface PasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string | null;
  isPasswordVisible: boolean;
  togglePasswordVisibility: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export default function Password({
  isPasswordVisible,
  togglePasswordVisibility,
  error,
  ...props
}: PasswordProps) {
  return (
    <StyledFlexWrapper direction="column">
      <StyledPassword>
        <StyledInput
          type={isPasswordVisible ? 'text' : 'password'}
          {...props}
          error={error}
        ></StyledInput>
        <button onClick={togglePasswordVisibility}>
          {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </StyledPassword>
      {error && <StyledErrorText>{error}</StyledErrorText>}
    </StyledFlexWrapper>
  );
}
