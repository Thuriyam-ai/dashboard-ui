import React, { useEffect } from "react";
import { useModal } from "../../contexts/modal/modal-context";
import styles from "./responsive-modal.module.scss";

export const ResponsiveModal: React.FC = () => {
  const { isOpen, content, closeModal } = useModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      {/* Backdrop */}
      <div onClick={closeModal} className={styles.backdrop} />

      {/* Modal/Bottom Sheet */}
      <div className={styles.modalContent}>
        {content}
        <button
          onClick={closeModal}
          className={styles.closeButton}
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
