import { useContext, useState } from 'react';
import { signUp } from '../../../../services/auth/auth';
import { FirebaseError } from 'firebase/app';
import {
  EMAIL_IN_USE_TEXT,
  FIREBASE_AUTH_ERROR_EMAIL_IN_USE,
  FIREBASE_AUTH_ERROR_NETWORK,
  GENERIC_ERROR_TEXT,
  NETWORK_ERROR_TEXT,
} from '../../../../constants/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationSchema } from '../validation';
import { useForm } from 'react-hook-form';
import { OVERVIEW_ROUTE } from '../../../../routes/routes';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../../context/authContext';

export interface RegistrationFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export function useSignUp() {
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
  const { setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = async (data: RegistrationFormInput) => {
    try {
      await signUp(data);
      setUserData({
        userEmail: data.email,
        userFullName: data.firstName + ' ' + data.lastName,
      });
      navigate(OVERVIEW_ROUTE);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === FIREBASE_AUTH_ERROR_EMAIL_IN_USE
      ) {
        setSignUpError(EMAIL_IN_USE_TEXT);
      } else if (
        error instanceof FirebaseError &&
        error.code === FIREBASE_AUTH_ERROR_NETWORK
      ) {
        setSignUpError(NETWORK_ERROR_TEXT);
      } else {
        setSignUpError(GENERIC_ERROR_TEXT);
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
