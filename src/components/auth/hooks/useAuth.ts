import { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { FirebaseError } from 'firebase/app';
import { AuthContext } from '../../../context/authContext';
import { SignInWithGoogle } from '../../../services/auth/auth';

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
      navigate('/finance-tracker');
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
      } else {
        setGoogleSignInError('Something went wrong. Try again later');
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
