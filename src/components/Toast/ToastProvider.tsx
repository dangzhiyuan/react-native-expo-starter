import React, { useState } from "react";
import { Toast } from "./index";

export const ToastContext = React.createContext<{
  showToast: (message: string, duration?: number) => void;
}>({
  showToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    duration?: number;
  }>({
    visible: false,
    message: "",
  });

  const showToast = (message: string, duration = 2000) => {
    setToast({ visible: true, message, duration });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <Toast
          message={toast.message}
          duration={toast.duration}
          onHide={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
