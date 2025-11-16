import { createContext, useContext, useState, ReactNode } from 'react';
import { Toast } from '@/ui';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
  show: (message: any, type?: ToastType) => void;
  hide: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');

  const show = (msg: string, toastType: ToastType = 'info') => {
    setMessage(msg);
    setType(toastType);
    setIsVisible(true);
  };

  const hide = () => setIsVisible(false);

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      {isVisible && <Toast message={message} type={type} onClose={hide} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
