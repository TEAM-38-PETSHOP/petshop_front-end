import { useAppDispatch } from '@/hooks/reduxHooks';
import styles from './makeCheckEmailModal.module.scss';
import {
  addServiceModal,
  removeServiceModal,
} from '@/redux/features/serviceModalSlice';
import { BaseModalSize, ServiceModalName } from '@/types';
import BaseModal from '../BaseModal/BaseModal';
import { toast } from 'react-toastify';
import { checkEmail } from '@/helpers/fetchAuthorization';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput/FormInput';

type Props = {
  index: number;
};

export default function MakeCheckEmailModal({ index }: Props) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ email: string }>();

  const handleLeaveButton = () => {
    dispatch(removeServiceModal(ServiceModalName.MakeCheckEmail));
  };

  const handleCheckEmail = (email: string) => {
    toast
      .promise(
        checkEmail(email),
        {
          pending: ' ',
          success: 'Код відправлено на вашу пошту',
          error: 'Пошту не знайдено',
        },
        { position: 'top-center' }
      )
      .then((res) => {
        if (res) {
          console.log(res);
          dispatch(
            addServiceModal({
              type: ServiceModalName.MakeResetPassword,
            })
          );
        }
      });
  };

  return (
    <BaseModal
      width={BaseModalSize.Large}
      onClose={handleLeaveButton}
      index={index}
    >
      <div className={styles.checkEmailModal}>
        <h5 className={styles.checkEmailModal__title}>Відновлення паролю</h5>
        <form
          className={styles.checkEmailModal__form}
          onSubmit={handleSubmit(() => handleCheckEmail(watch('email')))}
        >
          <FormInput
            register={register('email', { required: "Це поле є обов'язковим" })}
            errors={errors.email?.message}
            type="email"
            placeholder="Введіть вашу електронну пошту"
          />
          <button
            className={styles.checkEmailModal__form__btn}
            type="submit"
          >
            Надіслати код
          </button>
        </form>
      </div>
    </BaseModal>
  );
}
