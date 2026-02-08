import { useState, type ReactNode } from 'react';
import Toast from '../components/Toast/Toast';
import { ToastContext } from './toastContext';

export interface Toast {
  message: string;
  type: 'success' | 'warning' | 'error';
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = ({ message, type }: Toast) => {
    setToast({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext value={{ toast, setToast, showToast }}>
      {children}
      {toast && <Toast />}
    </ToastContext>
  );
}
