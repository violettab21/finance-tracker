import ProfileEditForm from '../../components/profile/ProfileEditForm/ProfileEditForm';
import PasswordResetForm from '../../components/profile/PasswordResetForm/PasswordResetForm';
import { StyledFlexWrapper } from '../../styled/flex';
import Button from '../../components/Button/Button';

export default function Profile() {
  return (
    <StyledFlexWrapper
      direction="column"
      gap={'1rem'}
      justify="center"
      align="center"
    >
      <StyledFlexWrapper width="30%" direction="column" gap={'1rem'}>
        <ProfileEditForm />
        <PasswordResetForm />
        <Button secondary>Delete Profile</Button>
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  );
}
