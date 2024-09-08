"use client";

import { useAppDispatch } from "@/hooks/reduxHooks";
import { removeServiceModal } from "@/redux/features/serviceModalSlice";
import { BaseModalSize, ServiceModalName } from "@/types";
import BaseModal from "../BaseModal/BaseModal";
import { NotificationErrorIcon } from "@/assets";
import styles from "./makeOrderErrorModal.module.scss";

interface MakeOrderErrorModalProps {
  index: number;
}

const MakeOrderErrorModal = ({ index }: MakeOrderErrorModalProps) => {
  const dispatch = useAppDispatch();

  const handleBackButton = () => {
    dispatch(removeServiceModal(ServiceModalName.MakeOrderError));
  };

  const handleLeaveButton = () => {
    dispatch(removeServiceModal(ServiceModalName.MakeOrderError));
  };

  return (
    <BaseModal
      width={BaseModalSize.Medium}
      onClose={handleBackButton}
      index={index}
    >
      <div className={styles.error}>
        <NotificationErrorIcon />
        <h1 className={styles.error__title}>
          Упс! Сталась непередбачувана помилка!
        </h1>
        <p className={styles.error__paragraph}>
          Звʼяжіться з менеджером або тех підтримкою!
        </p>
        <div className={styles.error__buttons}>
          <button
            onClick={handleBackButton}
            className={styles.error__buttons__back}
          >
            Назад
          </button>
          <button
            onClick={handleLeaveButton}
            className={styles.error__buttons__support}
          >
            Звʼязатись з тех підтримкою
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default MakeOrderErrorModal;
