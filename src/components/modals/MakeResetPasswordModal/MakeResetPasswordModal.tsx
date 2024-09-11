import { toast } from 'react-toastify';
import styles from './makeResetPasswordModal.module.scss';
import { resetPassword } from '@/helpers/fetchAuthorization';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { removeServiceModal } from '@/redux/features/serviceModalSlice';
import { BaseModalSize, ServiceModalName } from '@/types';
import BaseModal from '../BaseModal/BaseModal';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput/FormInput';

interface IResetPassword {
  code: string;
  newPassword: string;
  repeatPassword: string;
}

type Props = {
  index: number;
};

export default function MakeResetPasswordModal({ index }: Props) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResetPassword>();

  const handleLeaveButton = () => {
    dispatch(removeServiceModal(ServiceModalName.MakeResetPassword));
  };
  const handleResetPassword = (code: string, password: string) => {
    toast
      .promise(
        resetPassword(code, password),
        {
          pending: ' ',
          success: 'Пароль змінено',
          error: 'Неправильний код',
        },
        { position: 'top-center' }
      )
      .then((res) => {
        if (res) {
          dispatch(removeServiceModal(ServiceModalName.MakeResetPassword));
          dispatch(removeServiceModal(ServiceModalName.MakeCheckEmail));
        }
      });
  };
  return (
    <BaseModal
      width={BaseModalSize.Large}
      onClose={handleLeaveButton}
      index={index}
    >
      <div className={styles.resetPasswordModal}>
        <h5 className={styles.resetPasswordModal__title}>Відновлення паролю</h5>
        <form
          className={styles.resetPasswordModal__form}
          onSubmit={handleSubmit(() =>
            handleResetPassword(watch('code'), watch('newPassword'))
          )}
        >
          <FormInput
            register={register('code', { required: "Це поле є обов'язковим" })}
            errors={errors.code?.message}
            placeholder="Введіть код"
          />

          <FormInput
            register={register('newPassword', {
              required: "Це поле є обов'язковим",
              minLength: {
                value: 8,
                message: 'Пароль має містити не менше 8 символів',
              },
              maxLength: {
                value: 25,
                message: 'Пароль має містити не більше 25 символів',
              },
            })}
            errors={errors.newPassword?.message}
            placeholder="Створіть пароль"
          />

          <FormInput
            register={register('repeatPassword', {
              required: "Це поле є обов'язковим",
              validate: (value) =>
                value === watch('newPassword') || 'Паролі не співпадають',
            })}
            errors={errors.repeatPassword?.message}
            placeholder="Повторіть пароль"
          />
          <button
            className={styles.resetPasswordModal__form__btn}
            type="submit"
          >
            Нагадати
          </button>
        </form>
      </div>
    </BaseModal>
  );
}
