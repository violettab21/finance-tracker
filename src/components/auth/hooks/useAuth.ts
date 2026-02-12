import { useState } from 'react';
import { useCookies } from 'react-cookie';

import { FirebaseError } from 'firebase/app';
import { SignInWithGoogle } from '../../../services/auth/auth';
import { GENERIC_ERROR_TEXT } from '../../../constants/constants';

export const useAuth = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [, setCookie] = useCookies(['user']);

  const [googleSignInError, setGoogleSignInError] = useState<string>('');

  const signUpWithGoogle = async () => {
    try {
      const user = await SignInWithGoogle();
      const userToken = await user.getIdToken();
      setCookie('user', userToken);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setGoogleSignInError('Unable to login');
      } else {
        setGoogleSignInError(GENERIC_ERROR_TEXT);
      }
    }
  };

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  return {
    signUpWithGoogle,
    isPasswordVisible,
    togglePasswordVisibility,
    googleSignInError,
  };
};
