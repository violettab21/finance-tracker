import ProfileEditForm from '../../components/profile/ProfileEditForm/ProfileEditForm';
import PasswordResetForm from '../../components/profile/PasswordResetForm/PasswordResetForm';
import { StyledFlexWrapper } from '../../styled/flex';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import ConfirmationMessage from '../../components/Confirmation/ConfirmationMessage';
import { useDeleteProfile } from './hooks/useDeleteProfile';

export default function Profile() {
  const {
    closeConfirmation,
    openConfirmation,
    isConfirmVisible,
    deleteAccount,
  } = useDeleteProfile();

  return (
    <StyledFlexWrapper direction="column" gap={'1rem'} justify="center">
      <StyledFlexWrapper width="30%" direction="column" gap={'1rem'}>
        <ProfileEditForm />
        <PasswordResetForm />
        <Button onClick={openConfirmation} secondary>
          Delete Profile
        </Button>
        {isConfirmVisible && (
          <Modal
            modalContent={
              <ConfirmationMessage
                confirmCallback={() => deleteAccount()}
                declineCallback={closeConfirmation}
                text="Are you sure you want to delete your profile? This action is permanent."
              />
            }
            showModal={isConfirmVisible}
            onClose={closeConfirmation}
          />
        )}
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  );
}
