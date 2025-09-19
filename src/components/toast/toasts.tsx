import { ToastPosition, useToast, type Toast } from "@/contexts/toast";
import Image from "next/image";
import styles from "./toast.module.scss";

interface ToastContainerProps {
  position?: (typeof ToastPosition)[keyof typeof ToastPosition];
}

interface ToastProps {
  toast: Toast;
  onDelete: (toast: Toast) => void;
}

/**
 * Toast container component
 * Displays toast notifications at the specified position on the screen
 * @param props - The props for the ToastContainer component
 * @param props.position - The position where toasts should appear (default: top-right)
 * @returns Toast container component
 */
export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = ToastPosition.TOP_RIGHT,
}) => {
  const { toasts, removeToasts } = useToast();

  return (
    <div className={styles[position]}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDelete={removeToasts} />
      ))}
    </div>
  );
};

/**
 * Individual toast component
 * Displays a single toast notification with title, message, and optional icon
 * @param props - The props for the Toast component
 * @param props.toast - The toast data to display
 * @param props.onDelete - Function to call when the toast is clicked (to remove it)
 * @returns Toast component
 */
const Toast = ({ toast, onDelete }: ToastProps) => (
  <div
    className={`${styles[toast.type]} ${styles["toast-container"]}`}
    onClick={() => {
      onDelete(toast);
    }}
  >
    {toast.icon && (
      <div className={styles["toast-icon"]}>
        <Image src={toast.icon} alt={toast.type} width={24} height={24} />
      </div>
    )}
    <div className={styles["toast-info"]}>
      <h3 className={styles["toast-title"]}>{toast.title}</h3>
      <p className={styles["toast-description"]}>{toast.message}</p>
    </div>
  </div>
);

export default ToastContainer;
