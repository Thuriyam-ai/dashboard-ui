"use client";
import { createContext, ReactNode, useContext, useState } from "react";

export type ToastType = "alert" | "success" | "error" | "info";

export const ToastPosition = {
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
  TOP_RIGHT: "top-right",
  TOP_LEFT: "top-left",
} as const;

export interface Toast {
  id?: string;
  title: string;
  message: string;
  type: ToastType;
  icon?: string;
}

interface ToastContextType {
  toasts: Toast[];
  addToasts: (toast: Toast | Toast[]) => void;
  removeToasts: (toast: Toast | Toast[]) => void;
}

// Default context values
const defaultContext: ToastContextType = {
  toasts: [],
  addToasts: () => {
    console.warn("addToasts called outside of ToastProvider");
  },
  removeToasts: () => {
    console.warn("removeToasts called outside of ToastProvider");
  },
};

const ToastContext = createContext<ToastContextType>(defaultContext);

/**
 * ToastProvider component
 * Provides a context for managing toast notifications
 * @param props - The props for the ToastProvider component
 * @param props.children - The child components to be rendered within the ToastProvider
 * @returns ToastProvider component
 */
export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToasts = (toast: Toast | Toast[]) => {
    if (Array.isArray(toast)) {
      // Add unique IDs to each toast if not provided
      const toastsWithIds = toast.map((t) => ({
        ...t,
        id: t.id ?? generateToastId(),
      }));
      setToasts((prev) => [...prev, ...toastsWithIds]);
      return;
    }

    // Add unique ID to single toast if not provided
    const toastWithId = {
      ...toast,
      id: toast.id ?? generateToastId(),
    };
    setToasts((prev) => [...prev, toastWithId]);
  };

  const removeToasts = (toast: Toast | Toast[]) => {
    if (Array.isArray(toast)) {
      // Remove multiple toasts by ID
      const toastIds = toast.map((t) => t.id);
      setToasts((prev) => prev.filter((t) => !toastIds.includes(t.id)));
      return;
    }

    // Remove single toast by ID
    setToasts((prev) => prev.filter((t) => t.id !== toast.id));
  };

  return (
    <ToastContext
      value={{
        toasts,
        addToasts,
        removeToasts,
      }}
    >
      {children}
    </ToastContext>
  );
};

// Helper function to generate unique IDs for toasts
const generateToastId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * useToast hook
 * Provides a context for managing toast notifications
 * @returns ToastContextType
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};
