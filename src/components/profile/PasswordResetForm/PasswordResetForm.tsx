import { StyledFlexWrapper } from '../../../styled/flex';
import Button from '../../Button/Button';
import Password from '../../Input/Password/Password';
import { PasswordComplexity } from '../../PasswordComplexity/PasswordComplexity';
import { StyledFormReset } from './styles';
import { useUpdatePassword } from './hooks/useUpdatePassword';

export interface PasswordResetFormInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordResetForm() {
  const {
    register,
    handleSubmit,
    errors,
    newPasswordValue,
    onSubmit,
    resetError,
  } = useUpdatePassword();

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
        {resetError && <p>{resetError}</p>}
        <Button primary>Save</Button>
      </StyledFlexWrapper>
    </StyledFormReset>
  );
}
