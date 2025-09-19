import { ToastProviderWrapper } from '../contexts/toast/index';
import { ModalProviderWrapper } from '../contexts/modal/index';

/**
 * This is a central wrapper where all the context providers will be set
 * The context wrapper will itself be wrapped around the root component
 * This wrapper will make data avaliable from all contexts rendered here throughout the app
 * @param props - The props for the ContextWrapper component
 * @param props.children - The child components to be rendered within the layout
 * @returns A ContextWrapper which has global access to all contexts
 */
export function ContextWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ModalProviderWrapper>
      <ToastProviderWrapper>{children}</ToastProviderWrapper>
    </ModalProviderWrapper>
  );
}
