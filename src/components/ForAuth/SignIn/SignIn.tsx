'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import styles from './signIn.module.scss';
import { signIn, signOut, useSession } from 'next-auth/react';
import FormInput from '@/components/FormInput/FormInput';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { checkErrors } from '@/helpers/checkErrors';
import useSynchronizationServer from '@/hooks/useSynchronizationServer';

interface ILoginForm {
  email: string;
  password: string;
}

type Props = {
  isSignIn: boolean;
  setIsSignIn: (value: boolean) => void;
};
export default function SignIn({ isSignIn, setIsSignIn }: Props) {
  useSynchronizationServer();
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const handleSubmitForm = async (data: ILoginForm) => {
    const { email, password } = data;

    const toastId = toast.loading('Чекаємо...');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: searchParams.get('callbackUrl') || '/',
    });

    if (res && !res.error) {
      router.push(res.url || '/');
      toast.update(toastId, {
        render: 'Успішний вхід!',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      });
    } else {
      toast.update(toastId, {
        render: checkErrors(res?.error as string),
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div
      className={classNames(styles.signIn, {
        [styles.signIn__active]: isSignIn,
      })}
    >
      <div className={styles.signIn__header}>
        <h4>Вхід в акаунт</h4>
        <p>
          Вперше у нас?{' '}
          <button
            rel="stylesheet"
            type="button"
            onClick={() => setIsSignIn(false)}
          >
            Зареєструватись зараз
          </button>
        </p>
      </div>
      <form
        className={styles.signIn__form}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <FormInput
          register={register('email', { required: "Це поле є обов'язковим" })}
          placeholder="Введіть вашу електронну пошту"
          type="email"
          errors={errors.email?.message}
        />
        <FormInput
          register={register('password', {
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
          type="password"
          placeholder="Введіть пароль"
          errors={errors.password?.message}
        />
        <button
          className={styles.signIn__button}
          type="submit"
        >
          Увійти
        </button>
      </form>
      <button
        type="button"
        onClick={() => signOut()}
      >
        Exit
      </button>
    </div>
  );
}
