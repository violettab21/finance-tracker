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
import { GENERIC_ERROR_TEXT } from '../../../../constants/constants';

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
      showToast({ type: 'success', message: 'Profile is updated' });
    } catch {
      showToast({ type: 'error', message: GENERIC_ERROR_TEXT });
    }
  };

  return {
    userDetails,
    userDetailsLoading,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
