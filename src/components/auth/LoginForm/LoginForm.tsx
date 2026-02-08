import { StyledFlexWrapper } from '../../../styled/flex';
import Input from '../../Input/Input';
import Password from '../../Input/Password/Password';
import Button from '../../Button/Button';
import Separator from '../../Separator/Separator';
import { StyledForm } from './styles';
import { useLogin } from './hooks/useLogin';
import { useAuth } from '../hooks/useAuth';
import { StyledLinkForm, StyledTitle } from '../styles';

export default function LoginForm() {
  const { onSubmit, register, handleSubmit, errors, isValid, signInError } =
    useLogin();

  const {
    signUpWithGoogle,
    isPasswordVisible,
    togglePasswordVisibility,
    googleSignInError,
  } = useAuth();

  return (
    <StyledFlexWrapper width="50%" justify="center">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="100%" gap="10px">
          <StyledTitle>Log in</StyledTitle>
          <p>
            Do not have an account?
            <StyledLinkForm to="/register">Sign Up</StyledLinkForm>
          </p>
          <Input
            placeholder="Email"
            type="email"
            {...register('email')}
            error={errors.email ? errors.email?.message || null : null}
          ></Input>

          <Password
            {...register('password')}
            placeholder="Password"
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            error={errors.password ? errors.password?.message || null : null}
          />
          <Button primary disabled={!isValid}>
            Login
          </Button>
          <Separator text="Or sign in with" />
          <Button secondary onClick={signUpWithGoogle}>
            Google
          </Button>
          {signInError ||
            (googleSignInError && <p>{signInError || googleSignInError}</p>)}
        </StyledFlexWrapper>
      </StyledForm>
    </StyledFlexWrapper>
  );
}
