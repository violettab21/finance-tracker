import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { ValidationSchema } from './validation';
import { StyledFlexWrapper } from '../../../styled/flex';
import Button from '../../Button/Button';
import Password from '../../Input/Password/Password';
import { PasswordComplexity } from '../../PasswordComplexity/PasswordComplexity';
import { useState } from 'react';
import {
  reauthUser,
  updateUserPassword,
} from '../../../services/profile/profile';
import { FirebaseError } from 'firebase/app';
import {
  FIREBASE_AUTH_ERROR_CREDENTIAL,
  GENERIC_ERROR_TEXT,
} from '../../../constants/constants';
import { StyledFormReset } from './styles';

export interface PasswordResetFormInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordResetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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

  const onSubmit = async (data: PasswordResetFormInput) => {
    console.log(data);
    try {
      await reauthUser(data);
      await updateUserPassword(data);
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === FIREBASE_AUTH_ERROR_CREDENTIAL) {
          setResetError('Incorrect password entered');
        } else {
          setResetError('Unable to update');
        }
      } else {
        setResetError(GENERIC_ERROR_TEXT);
      }
    }
  };

  return (
    <StyledFormReset onSubmit={handleSubmit(onSubmit)}>
      <StyledFlexWrapper direction="column" width="100%" gap="10px">
        <p>Password Reset</p>
        <Password
          {...register('oldPassword')}
          placeholder="Enter old password"
          error={
            errors.oldPassword ? errors.oldPassword?.message || null : null
          }
        />

        <Password
          {...register('newPassword')}
          placeholder="Enter New Password"
          error={
            errors.newPassword ? errors.newPassword?.message || null : null
          }
        />
        {newPasswordValue && <PasswordComplexity password={newPasswordValue} />}

        <Password
          {...register('confirmPassword')}
          placeholder="Confirm new password"
          error={
            errors.confirmPassword
              ? errors.confirmPassword?.message || null
              : null
          }
        />
        {resetError && <p>Some error occurred</p>}
        <Button primary>Save</Button>
      </StyledFlexWrapper>
    </StyledFormReset>
  );
}
