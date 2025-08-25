'use client'; // Required for interactive toast notifications

import React, { createContext, useContext, useState } from 'react';
import { cn } from '../utils/cn';

type ToastType = 'info' | 'success' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * ToastProvider wraps the application and provides a function to display
 * transient notifications. Toasts automatically disappear after a few
 * seconds. Consumers can invoke `useToast().addToast()` to enqueue a new
 * message.
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
    // Remove toast after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed inset-x-0 top-4 flex flex-col items-center space-y-2 z-50">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={cn(
              'rounded-md px-4 py-2 shadow-lg',
              toast.type === 'info' && 'bg-accent text-accent-foreground',
              toast.type === 'success' && 'bg-success text-success-foreground',
              toast.type === 'error' && 'bg-danger text-danger-foreground',
            )}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/**
 * Hook that exposes the toast context. Should be called from within a
 * `ToastProvider`.
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
