import { useContext } from 'react';
import { StyledToast } from './styles';
import { ToastContext } from '../../context/toastContext';
import { type Toast } from '../../context/toastProvider';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import { IoMdClose } from 'react-icons/io';

export default function Toast() {
  const { toast, setToast } = useContext(ToastContext);

  if (!toast) return null;

  return (
    <StyledToast $type={toast?.type}>
      <p>{toast?.message}</p>
      <ButtonIcon onClick={() => setToast(null)}>
        <IoMdClose />
      </ButtonIcon>
    </StyledToast>
  );
}
