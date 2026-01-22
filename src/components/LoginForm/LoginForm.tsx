import { useNavigate } from 'react-router';
import { StyledFlexWrapper } from '../../styled/flex';
import Input from '../Input/Input';
import Password from '../Input/Password/Password';
import Button from '../Button/Button';
import Separator from '../Separator/Separator';
import { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/authContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import {
  FIREBASE_AUTH_ERROR_CREDENTIAL,
  FIREBASE_AUTH_ERROR_NETWORK,
} from '../../constants/contants';
import { signIn, SignInWithGoogle } from '../../services/auth/auth';
import { ValidationSchemaSignIn } from './validation';
import { StyledForm } from './styles';
import { StyledLinkRegisterForm, StyledTitle } from '../RegisterForm/styles';

interface SignInFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setUserData } = useContext(AuthContext);
  const [, setCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormInput>({
    resolver: zodResolver(ValidationSchemaSignIn),
    mode: 'onChange',
  });
  const [signUpError, setSignUpError] = useState<string>('');
  const onSubmit = async (data: SignInFormInput) => {
    try {
      const user = await signIn(data);
      const userToken = await user.getIdToken();
      setCookie('user', userToken);
      setUserData({ userToken, userName: user.displayName });
      navigate('/finance-tracker');
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === FIREBASE_AUTH_ERROR_CREDENTIAL
      ) {
        setSignUpError('Email is not correct');
      } else if (
        error instanceof FirebaseError &&
        error.code === FIREBASE_AUTH_ERROR_NETWORK
      ) {
        setSignUpError('Network error. Check Internet connection');
      } else {
        setSignUpError('Something went wrong. Try again later');
      }
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const user = await SignInWithGoogle();
      const userToken = await user.getIdToken();
      setCookie('user', userToken);
      setUserData({ userToken, userName: user.displayName });
      navigate('/finance-tracker');
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
      } else {
        setSignUpError('Something went wrong. Try again later');
      }
    }
  };

  return (
    <StyledFlexWrapper width="50%" justify="center">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="100%" gap="10px">
          <StyledTitle>Log in</StyledTitle>
          <p>
            Do not have an account?{' '}
            <StyledLinkRegisterForm to="/register">
              Sign Up
            </StyledLinkRegisterForm>
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
            togglePasswordVisibility={(event) => {
              event.preventDefault();
              setIsPasswordVisible(!isPasswordVisible);
            }}
            error={errors.password ? errors.password?.message || null : null}
          />
          <Button primary disabled={!isValid}>
            Login
          </Button>
          <Separator text="Or sign in with" />
          <Button secondary onClick={signUpWithGoogle}>
            Google
          </Button>
          {signUpError && <p>{signUpError}</p>}
        </StyledFlexWrapper>
      </StyledForm>
    </StyledFlexWrapper>
  );
}
