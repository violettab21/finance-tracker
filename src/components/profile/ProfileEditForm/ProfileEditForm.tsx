import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ValidationSchema } from './validation';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../../context/toastContext';
import {
  getUser,
  updateUserEmail,
  updateUserName,
} from '../../../services/profile/profile';
import { StyledFlexWrapper } from '../../../styled/flex';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { StyledForm } from './styles';
import Loader from '../../Loader/Loader';

export interface ProfileFormInput {
  firstName: string;
  lastName: string;
  email: string;
}

export default function ProfileEditForm() {
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

  if (userDetailsLoading) return <Loader />;

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

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledFlexWrapper direction="column" width="100%" gap="10px">
        <p>Update your profile data</p>

        <Input
          placeholder="Name"
          defaultValue={userDetails?.firstName || ''}
          {...register('firstName')}
          error={errors.firstName ? errors.firstName?.message || null : null}
        ></Input>

        <Input
          placeholder="Surname"
          defaultValue={userDetails?.lastName || ''}
          {...register('lastName')}
          error={errors.lastName ? errors.lastName?.message || null : null}
        ></Input>

        <Input
          disabled
          placeholder="Email"
          type="email"
          defaultValue={userDetails?.email || ''}
          {...register('email')}
          error={errors.email ? errors.email?.message || null : null}
        ></Input>
        {updateError && <p>Some error occurred</p>}
        <Button primary>Update</Button>
      </StyledFlexWrapper>
    </StyledForm>
  );
}
