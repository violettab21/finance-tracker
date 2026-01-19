import { type InputHTMLAttributes } from 'react';
import { StyledPassword } from './styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Input from '../Input/Input';

interface PasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  isPasswordVisible: boolean;
  togglePasswordVisibility: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export default function Password({
  isPasswordVisible,
  togglePasswordVisibility,
}: PasswordProps) {
  return (
    <StyledPassword>
      <Input type={isPasswordVisible ? 'password' : 'text'}></Input>
      <button onClick={togglePasswordVisibility}>
        {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
      </button>
    </StyledPassword>
  );
}
