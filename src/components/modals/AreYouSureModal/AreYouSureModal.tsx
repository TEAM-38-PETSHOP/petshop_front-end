'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { removeServiceModal } from '@/redux/features/serviceModalSlice';
import { BaseModalSize, ServiceModalName } from '@/types';
import BaseModal from '../BaseModal/BaseModal';
import { NotificationErrorIcon } from '@/assets';
import { toast } from 'react-toastify';
import styles from './areYouSureModal.module.scss';
import { deleteAccount } from '@/helpers/fetchAuthorization';
import { signOut } from 'next-auth/react';
import { checkWindow } from '@/helpers/checkWindow';

interface AreYouSureModalProps {
  index: number;
}

const AreYouSureModal = ({ index }: AreYouSureModalProps) => {
  const dispatch = useAppDispatch();

  const { userId, token } = useAppSelector(
    (state) => state.serviceModal[ServiceModalName.AreYouSure]
  );

  const handleBackButton = () => {
    dispatch(removeServiceModal(ServiceModalName.AreYouSure));
  };

  const handleDeleteAccount = async () => {
    const toastId = toast.loading('Чекаємо...');
    try {
      const response = await deleteAccount(userId, token);

      if (response) {
        toast.update(toastId, {
          render: 'Аккаунт успішно видалено!',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        });

        dispatch(removeServiceModal(ServiceModalName.AreYouSure));

        await signOut();
        checkWindow() && localStorage.clear();
      } else {
        toast.update(toastId, {
          render: 'Помилка видалення аккаунта!',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error: any) {
      toast.update(toastId, {
        render: `Сталася помилка: ${error.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <BaseModal
      width={BaseModalSize.Medium}
      onClose={handleBackButton}
      index={index}
    >
      <div className={styles.areYouSure}>
        <NotificationErrorIcon />
        <h1 className={styles.areYouSure__title}>
          Ви впевнені, що хочете видалити аккаунт?
        </h1>
        <p className={styles.areYouSure__paragraph}>
          Після видалення всі ваші дані будуть видалені з системи і їх буде
          неможливо повернути
        </p>
        <div className={styles.areYouSure__buttons}>
          <button
            onClick={handleBackButton}
            className={styles.areYouSure__buttons__back}
          >
            Ні, я не впевнений/впевнена
          </button>
          <button
            onClick={handleDeleteAccount}
            className={styles.areYouSure__buttons__delete}
          >
            Так, я впевнений/впевнена
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default AreYouSureModal;
