import { useForm, useWatch } from 'react-hook-form';
import type { PasswordResetFormInput } from '../PasswordResetForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationSchema } from '../validation';
import { ToastContext } from '../../../../context/toastContext';
import { useContext, useState } from 'react';
import {
  reauthUser,
  updateUserPassword,
} from '../../../../services/profile/profile';
import { FirebaseError } from 'firebase/app';
import {
  FIREBASE_AUTH_ERROR_CREDENTIAL,
  GENERIC_ERROR_TEXT,
} from '../../../../constants/constants';

export const useUpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    reset,
  } = useForm<PasswordResetFormInput>({
    resolver: zodResolver(ValidationSchema),
    mode: 'onChange',
  });

  const newPasswordValue = useWatch({
    control,
    name: 'newPassword',
    defaultValue: '',
  });
  const [resetError, setResetError] = useState<string | null>(null);
  const { showToast } = useContext(ToastContext);

  const onSubmit = async (data: PasswordResetFormInput) => {
    try {
      await reauthUser(data);
      await updateUserPassword(data);
      showToast({ type: 'success', message: 'Password is updated' });
      reset();
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === FIREBASE_AUTH_ERROR_CREDENTIAL) {
          setError('oldPassword', {
            type: 'manual',
            message: 'Incorrect Password',
          });
        } else {
          setResetError('Unable to update password');
        }
      } else {
        setResetError(GENERIC_ERROR_TEXT);
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    newPasswordValue,
    onSubmit,
    resetError,
  };
};
