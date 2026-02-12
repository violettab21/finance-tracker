import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import { StyledFlexWrapper } from '../../styled/flex';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import Button from '../../components/Button/Button';
import { ValidationSchema } from './validation';
import {
  updateUserEmail,
  updateUserName,
} from '../../services/profile/profile';
import { ToastContext } from '../../context/toastContext';
import { AuthContext } from '../../context/authContext';

export interface ProfileFormInput {
  firstName: string;
  lastName: string;
  email: string;
}

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormInput>({
    resolver: zodResolver(ValidationSchema),
    mode: 'onChange',
  });
  const [updateError, setUpdateError] = useState<string>('');
  const { userData } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
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

  if (!userData.userToken) {
    return null;
  }

  return (
    <StyledFlexWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="100%" gap="10px">
          <p>Update your profile data</p>

          <Input
            placeholder="Name"
            defaultValue={userData.userFirstName || ''}
            {...register('firstName')}
            error={errors.firstName ? errors.firstName?.message || null : null}
          ></Input>

          <Input
            placeholder="Surname"
            defaultValue={userData.userLastName || ''}
            {...register('lastName')}
            error={errors.lastName ? errors.lastName?.message || null : null}
          ></Input>

          <Input
            disabled
            placeholder="Email"
            type="email"
            defaultValue={userData?.userEmail || ''}
            {...register('email')}
            error={errors.email ? errors.email?.message || null : null}
          ></Input>
          {updateError && <p>Some error occurred</p>}
          <Button primary>Update</Button>
        </StyledFlexWrapper>
      </form>
    </StyledFlexWrapper>
  );
}
