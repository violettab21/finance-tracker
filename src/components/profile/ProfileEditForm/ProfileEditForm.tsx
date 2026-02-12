import { StyledFlexWrapper } from '../../../styled/flex';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { StyledForm } from './styles';
import Loader from '../../Loader/Loader';
import { useUpdateProfile } from './hooks/useUpdateProfile';

export interface ProfileFormInput {
  firstName: string;
  lastName: string;
  email: string;
}

export default function ProfileEditForm() {
  const {
    userDetails,
    userDetailsLoading,
    register,
    handleSubmit,
    errors,
    updateError,
    onSubmit,
  } = useUpdateProfile();

  if (userDetailsLoading) return <Loader />;

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
