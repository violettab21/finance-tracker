import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { ProfileFormInput } from '../ProfileEditForm';
import { ValidationSchema } from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContext } from '../../../../context/toastContext';
import {
  getUser,
  updateUserEmail,
  updateUserName,
} from '../../../../services/profile/profile';

export const useUpdateProfile = () => {
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>();
  const [userDetailsLoading, setUserDetailsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormInput>({
    resolver: zodResolver(ValidationSchema),
    mode: 'onChange',
    defaultValues: userDetails
      ? {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
        }
      : undefined,
  });

  const [updateError, setUpdateError] = useState<string>('');
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    const getUserDetails = async () => {
      const details = await getUser();
      setUserDetails(details);
      setUserDetailsLoading(false);
    };
    getUserDetails();
  }, []);

  const onSubmit = async (data: ProfileFormInput) => {
    try {
      await updateUserName(data);
      await updateUserEmail(data);
      showToast({ type: 'success', message: 'Your profile update' });
    } catch {
      setUpdateError('error');
      showToast({ type: 'error', message: 'Something went wrong' });
    }
  };

  return {
    userDetails,
    userDetailsLoading,
    register,
    handleSubmit,
    errors,
    updateError,
    onSubmit,
  };
};
