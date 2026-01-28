import { createPortal } from 'react-dom';

import {
  StyledModalClose,
  StyledModalWindow,
  StyledModalWrapper,
} from './styles';
import { GrClose } from 'react-icons/gr';

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
              <StyledModalClose onClick={onClose}>
                <GrClose size={20} />
              </StyledModalClose>
              {modalContent}
            </StyledModalWindow>
          </StyledModalWrapper>,
          document.body
        )}
    </>
  );
}
