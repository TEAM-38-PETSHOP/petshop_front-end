'use client';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { removeServiceModal } from '@/redux/features/serviceModalSlice';
import { BaseModalSize, ProfileTab, ServiceModalName } from '@/types';
import BaseModal from '../BaseModal/BaseModal';
import { NotificationSuccessIcon } from '@/assets';
import styles from './makeOrderSuccessModal.module.scss';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface MakeOrderSuccessModalProps {
  index: number;
}

const MakeOrderSuccessModal = ({ index }: MakeOrderSuccessModalProps) => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';

  const handleBackButton = () => {
    dispatch(removeServiceModal(ServiceModalName.MakeOrderSuccess));
  };

  return (
    <BaseModal
      width={BaseModalSize.Medium}
      onClose={handleBackButton}
      index={index}
    >
      <div className={styles.success}>
        <NotificationSuccessIcon />
        <h1 className={styles.success__title}>Дякуємо за покупку!</h1>
        <p className={styles.success__paragraph}>
          Ваше замовлення обробляється менеджером!
        </p>
        <div className={styles.success__buttons}>
          {isAuthenticated ? (
            <Link
              href={`/profile?activeTab=${ProfileTab.OrdersHistory}`}
              onClick={handleBackButton}
              className={styles.success__buttons__submit}
            >
              До історії замовлень
            </Link>
          ) : (
            <button
              onClick={handleBackButton}
              className={styles.success__buttons__submit}
            >
              Продовжити
            </button>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default MakeOrderSuccessModal;
