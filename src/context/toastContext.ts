import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { Toast } from './toastProvider';

interface ToastContextType {
  toast: Toast | null;
  setToast: Dispatch<SetStateAction<Toast | null>>;
  showToast: ({ type, message }: Toast) => void;
}

export const ToastContext = createContext<ToastContextType>({
  toast: null,
  setToast: () => {},
  showToast: () => {},
});
