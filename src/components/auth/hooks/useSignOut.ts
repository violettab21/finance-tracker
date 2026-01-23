import { FirebaseError } from 'firebase/app';
import { signOutUser } from '../../../services/auth/auth';
import { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/authContext';

export function useSignOut() {
  const { setUserData } = useContext(AuthContext);
  const [, , removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  async function signOut() {
    try {
      await signOutUser();
      setUserData({ userName: null, userToken: null });
      removeCookie('user');
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
      } else {
        console.log('Something went wrong. Try again later');
      }
    }
  }

  return { signOut };
}
