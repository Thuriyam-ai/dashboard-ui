"use client";

import { ToastProvider } from "./toast-context";
import { ToastContainer } from "@/components/toast";

/**
 * ToastProviderWrapper component
 * This component is used to wrap the app with the ToastProvider and ToastContainer component
 * @param props - The props for the ToastProviderWrapper component
 * @param props.children - The child components to be rendered within the layout
 * @returns The ToastProviderWrapper component
 */
export function ToastProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      {children}
      <ToastContainer />
    </ToastProvider>
  );
}
