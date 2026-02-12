import { FirebaseError } from 'firebase/app';
import { signOutUser } from '../../../services/auth/auth';
import { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/authContext';
import { ToastContext } from '../../../context/toastContext';
import {
  FIREBASE_AUTH_ERROR_NETWORK,
  GENERIC_ERROR_TEXT,
  LOG_OUT_ERROR,
  LOG_OUT_SUCCESS_TEXT,
  NETWORK_ERROR_TEXT,
} from '../../../constants/constants';

export function useSignOut() {
  const { setUserData } = useContext(AuthContext);
  const [, , removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  async function signOut() {
    try {
      await signOutUser();
      setUserData({
        userFullName: null,
        userEmail: null,
      });
      removeCookie('user');
      navigate('/');
      showToast({ type: 'success', message: LOG_OUT_SUCCESS_TEXT });
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === FIREBASE_AUTH_ERROR_NETWORK) {
          showToast({
            type: 'error',
            message: NETWORK_ERROR_TEXT,
          });
        } else {
          showToast({
            type: 'error',
            message: LOG_OUT_ERROR,
          });
        }
      } else {
        showToast({
          type: 'error',
          message: GENERIC_ERROR_TEXT,
        });
      }
    }
  }

  return { signOut };
}
