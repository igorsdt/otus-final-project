import { createPortal } from 'react-dom';
import type { ModalProps } from './Modal.types';
import styles from './Modal.module.css';
import { FaRegWindowClose } from "react-icons/fa";

const Modal = (
  { children, onClose, isVisible }: ModalProps
) => {
  if (!isVisible) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.content}>
        <button
          className={styles.close}
          type="button"
          onClick={onClose}
        >
          <FaRegWindowClose />
        </button>
        <div className={styles.wrapper}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export { Modal, type ModalProps };
