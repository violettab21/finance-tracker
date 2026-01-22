import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/authContext';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { signUp } from '../../../../services/auth/auth';
import { FirebaseError } from 'firebase/app';
import {
  FIREBASE_AUTH_ERROR_EMAIL_IN_USE,
  FIREBASE_AUTH_ERROR_NETWORK,
} from '../../../../constants/contants';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationSchema } from '../validation';
import { useForm } from 'react-hook-form';

interface RegistrationFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export function useSignUp() {
  const { setUserData } = useContext(AuthContext);
  const [, setCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<RegistrationFormInput>({
    resolver: zodResolver(ValidationSchema),
    mode: 'onChange',
  });
  const [signUpError, setSignUpError] = useState<string>('');
  const onSubmit = async (data: RegistrationFormInput) => {
    try {
      const user = await signUp(data);
      const userToken = await user.getIdToken();
      setCookie('user', userToken);
      setUserData({ userToken, userName: user.displayName });
      navigate('/finance-tracker');
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

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    isValid,
    control,
    signUpError,
  };
}
