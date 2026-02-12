import { useContext, useState } from 'react';
import { ToastContext } from '../../../context/toastContext';
import { deleteUserProfile } from '../../../services/profile/profile';
import { FirebaseError } from 'firebase/app';
import { GENERIC_ERROR_TEXT } from '../../../constants/constants';

export const useDeleteProfile = () => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { showToast } = useContext(ToastContext);

  const deleteAccount = async () => {
    try {
      await deleteUserProfile();
      showToast({ type: 'success', message: 'User deleted' });
    } catch (err) {
      if (err instanceof FirebaseError) {
        showToast({ type: 'error', message: 'Unable to delete user' });
      } else {
        showToast({ type: 'error', message: GENERIC_ERROR_TEXT });
      }
    }
  };

  const closeConfirmation = () => {
    setIsConfirmVisible(false);
  };

  const openConfirmation = () => {
    setIsConfirmVisible(true);
  };

  return {
    closeConfirmation,
    openConfirmation,
    isConfirmVisible,
    deleteAccount,
  };
};
