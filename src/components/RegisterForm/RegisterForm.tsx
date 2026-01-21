import { useState } from 'react';
import { StyledFlexWrapper } from '../../styled/flex';
import Button from '../Button/Button';
import Checkbox from '../Input/Checkbox/Checkbox';
import Input from '../Input/Input';
import Password from '../Input/Password/Password';
import Separator from '../Separator/Separator';
import { RegistrationFormWrapper, StyledTitle } from './styles';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationSchema } from './validation';
import { PasswordComplexity } from '../PasswordComplexity/PasswordComplexity';
import { SignInWithGoogle, signUp } from '../../services/auth/auth';
import { useCookies } from 'react-cookie';
import { FirebaseError } from 'firebase/app';
import {
  FIREBASE_AUTH_ERROR_EMAIL_IN_USE,
  FIREBASE_AUTH_ERROR_NETWORK,
} from '../../constants/contants';

interface RegistrationFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export default function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [, setCookie] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<RegistrationFormInput>({
    resolver: zodResolver(ValidationSchema),
    mode: 'onBlur',
  });
  const [signUpError, setSignUpError] = useState<string>('');
  const onSubmit = async (data: RegistrationFormInput) => {
    try {
      const user = await signUp(data);
      const userToken = await user.getIdToken();
      setCookie('token', userToken);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === FIREBASE_AUTH_ERROR_EMAIL_IN_USE
      ) {
        setSignUpError('Email is already in use');
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
      setCookie('token', userToken);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
      } else {
        setSignUpError('Something went wrong. Try again later');
      }
    }
  };

  const password = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });

  return (
    <RegistrationFormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="20%" gap="10px">
          <StyledTitle>Create an account</StyledTitle>
          <p>Already have an account? Log in</p>
          <StyledFlexWrapper gap="10px">
            <Input
              placeholder="Name"
              {...register('firstName')}
              error={
                errors.firstName ? errors.firstName?.message || null : null
              }
            ></Input>

            <Input
              placeholder="Surname"
              {...register('lastName')}
              error={errors.lastName ? errors.lastName?.message || null : null}
            ></Input>
          </StyledFlexWrapper>
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
          {password && <PasswordComplexity password={password} />}
          <Checkbox
            {...register('terms')}
            labelText="I agree to the Terms & Conditions"
            error={errors.terms ? errors.terms?.message || null : null}
          />

          <Button primary disabled={!isValid}>
            Create Account
          </Button>
          <Separator text="Or sign up with" />
          <Button secondary onClick={signUpWithGoogle}>
            Google
          </Button>
          {signUpError && <p>{signUpError}</p>}
        </StyledFlexWrapper>
      </form>
    </RegistrationFormWrapper>
  );
}
