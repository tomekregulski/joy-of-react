import React, { createContext, useState, useCallback } from 'react';
import { useKeyDown } from '../../hooks/useKeyDown';

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const handleEscape = useCallback(() => {
    setToasts([]);
  }, []);

  useKeyDown('Escape', handleEscape);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const newToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
