import { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { FirebaseError } from 'firebase/app';
import { AuthContext } from '../../../context/authContext';
import { SignInWithGoogle } from '../../../services/auth/auth';
import { GENERIC_ERROR_TEXT } from '../../../constants/constants';
import { EXPENSES_ROUTE } from '../../../routes/routes';

export const useAuth = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setUserData } = useContext(AuthContext);
  const [, setCookie] = useCookies(['user']);
  const navigate = useNavigate();

  const [googleSignInError, setGoogleSignInError] = useState<string>('');

  const signUpWithGoogle = async () => {
    try {
      const user = await SignInWithGoogle();
      const userToken = await user.getIdToken();
      setCookie('user', userToken);
      setUserData({ userToken, userName: user.displayName });
      navigate(EXPENSES_ROUTE);
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
