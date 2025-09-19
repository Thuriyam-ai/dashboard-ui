"use client";

import { ModalProvider } from "./modal-context";
import { ResponsiveModal } from "@/components/modal";

/**
 * ModalProviderWrapper component
 * This component is used to wrap the app with the ModalProvider and ResponsiveModal
 * @param props - The props for the ModalProviderWrapper component
 * @param props.children - The child components to be rendered within the layout
 * @returns The ModalProviderWrapper component
 */
export function ModalProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      {children}
      <ResponsiveModal />
    </ModalProvider>
  );
}
