import React, { createContext, useContext, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Toast, ToastProps } from './Toast';
import { moderateScale, spacing, isTablet } from '../../utils/responsive';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top' | 'bottom';

interface ToastOptions {
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
}

interface ToastItem extends ToastProps {
  id: number;
}

interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  let nextId = 0;

  const showToast = useCallback((message: string, options: ToastOptions = {}) => {
    const id = nextId++;
    const newToast: ToastItem = {
      id,
      message,
      type: options.type || 'info',
      position: options.position || 'bottom',
      duration: options.duration || 2000,
      onHide: () => {
        setToasts(current => current.filter(toast => toast.id !== id));
      },
    };

    setToasts(current => [...current, newToast]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.md,
    right: spacing.md,
    // 平板设备限制最大宽度
    maxWidth: isTablet ? 400 : undefined,
    alignSelf: 'center',
  },
  toast: {
    padding: spacing.md,
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    marginLeft: spacing.sm,
  },
}); 