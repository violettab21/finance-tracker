import styled from 'styled-components';
import { colors } from '../../styled/colors';

export type StyledProps = {
  $type: 'success' | 'warning' | 'error';
};

export const StyledToast = styled.div<StyledProps>`
  position: fixed;
  right: 2px;
  bottom: 2px;
  background: ${({ $type }) =>
    $type === 'success'
      ? colors.toastSuccess
      : $type === 'warning'
        ? colors.toastWarning
        : colors.toastError};
  width: 500px;
  z-index: 1000;
  border-radius: 8px;
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  animation: toast 0.3s ease-in-out;
  transition: all 3ms;

  @keyframes toast {
    from {
      transform: translateY(20px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
