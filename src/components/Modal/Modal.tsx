import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import { StyledModalWindow, StyledModalWrapper } from './styles';

export default function Modal({
  modalContent,
  showModal,
  onClose,
}: {
  modalContent: React.ReactNode;
  showModal: boolean;
  onClose: () => void;
}) {
  if (!showModal) return null;

  return (
    <>
      {showModal &&
        createPortal(
          <StyledModalWrapper>
            <StyledModalWindow>
              <Button onClick={onClose}>Close</Button>
              {modalContent}
            </StyledModalWindow>
          </StyledModalWrapper>,
          document.body
        )}
    </>
  );
}
