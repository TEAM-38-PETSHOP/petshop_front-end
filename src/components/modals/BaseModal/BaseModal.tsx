import { CloseIcon } from "@/assets";
import { ServiceModalConfig } from "@/types";
import styles from "./baseModal.module.scss";

interface BaseModalProps extends ServiceModalConfig {
  title?: string;
  width: string;
  children?: React.ReactNode;
}

const BaseModal = ({
  onClose,
  index = 1000,
  width,
  title,
  children,
}: BaseModalProps) => {
  return (
    <div className={styles.modal} style={{ zIndex: index }}>
      <div className={styles.modal__container} style={{ maxWidth: width }}>
        <button className={styles.modal__close} onClick={onClose}>
          <CloseIcon />
        </button>
        <div className={styles.modal__content}>
          {title && <h4 className={styles.modal__title}>{title}</h4>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
