import ProfileEditForm from '../../components/profile/ProfileEditForm/ProfileEditForm';
import PasswordResetForm from '../../components/profile/PasswordResetForm/PasswordResetForm';
import { StyledFlexWrapper } from '../../styled/flex';
import Button from '../../components/Button/Button';
import { useContext, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import ConfirmationMessage from '../../components/Confirmation/ConfirmationMessage';
import { FirebaseError } from 'firebase/app';
import { GENERIC_ERROR_TEXT } from '../../constants/constants';
import { deleteUserProfile } from '../../services/profile/profile';
import { ToastContext } from '../../context/toastContext';

export default function Profile() {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { showToast } = useContext(ToastContext);

  const deleteAccount = async () => {
    try {
      await deleteUserProfile();
      showToast({ type: 'success', message: 'User deleted' });
    } catch (err) {
      if (err instanceof FirebaseError) {
        showToast({ type: 'error', message: 'Unable to delete user' });
      } else {
        showToast({ type: 'error', message: GENERIC_ERROR_TEXT });
      }
    }
  };

  return (
    <StyledFlexWrapper direction="column" gap={'1rem'} justify="center">
      <StyledFlexWrapper width="30%" direction="column" gap={'1rem'}>
        <ProfileEditForm />
        <PasswordResetForm />
        <Button onClick={() => setIsConfirmVisible(true)} secondary>
          Delete Profile
        </Button>
        {isConfirmVisible && (
          <Modal
            modalContent={
              <ConfirmationMessage
                confirmCallback={() => deleteAccount()}
                declineCallback={() => setIsConfirmVisible(false)}
                text="Are you sure you want to delete your profile? This action is permanent."
              />
            }
            showModal={isConfirmVisible}
            onClose={() => setIsConfirmVisible(false)}
          />
        )}
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  );
}
