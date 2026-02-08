import { useState } from 'react';

import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationSchemaSignIn } from '../validation';
import { signIn } from '../../../../services/auth/auth';
import {
  FIREBASE_AUTH_ERROR_CREDENTIAL,
  FIREBASE_AUTH_ERROR_NETWORK,
} from '../../../../constants/constants';
import { FirebaseError } from 'firebase/app';

interface SignInFormInput {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormInput>({
    resolver: zodResolver(ValidationSchemaSignIn),
    mode: 'onChange',
  });
  const [signInError, setSignInError] = useState<string>('');
  const onSubmit = async (data: SignInFormInput) => {
    try {
      await signIn(data);
      navigate('/finance-tracker');
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === FIREBASE_AUTH_ERROR_CREDENTIAL
      ) {
        setSignInError('Email is not correct');
      } else if (
        error instanceof FirebaseError &&
        error.code === FIREBASE_AUTH_ERROR_NETWORK
      ) {
        setSignInError('Network error. Check Internet connection');
      } else {
        setSignInError('Something went wrong. Try again later');
      }
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    isValid,
    signInError,
  };
};
