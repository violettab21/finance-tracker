import { useState } from 'react';

import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationSchemaSignIn } from '../validation';
import { signIn } from '../../../../services/auth/auth';
import {
  FIREBASE_AUTH_ERROR_CREDENTIAL,
  FIREBASE_AUTH_ERROR_NETWORK,
  GENERIC_ERROR_TEXT,
  INVALID_CREDENTIAL_TEXT,
  NETWORK_ERROR_TEXT,
} from '../../../../constants/constants';
import { FirebaseError } from 'firebase/app';
import { EXPENSES_ROUTE } from '../../../../routes/routes';

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
      navigate(EXPENSES_ROUTE);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === FIREBASE_AUTH_ERROR_CREDENTIAL
      ) {
        setSignInError(INVALID_CREDENTIAL_TEXT);
      } else if (
        error instanceof FirebaseError &&
        error.code === FIREBASE_AUTH_ERROR_NETWORK
      ) {
        setSignInError(NETWORK_ERROR_TEXT);
      } else {
        setSignInError(GENERIC_ERROR_TEXT);
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
