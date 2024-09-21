"use client";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import styles from "./signUp.module.scss";
import FormInput from "@/components/FormInput/FormInput";
import { useRouter } from "next/navigation";
import { registerUser } from "@/helpers/fetchAuthorization";
import { checkErrors } from "@/helpers/checkErrors";
import { toast } from "react-toastify";

interface IRegisterForm {
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
}

type Props = {
  isSignIn: boolean;
  setIsSignIn: (value: boolean) => void;
};

export default function SignUp({ isSignIn, setIsSignIn }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const handleRegister = async (data: IRegisterForm) => {
    const { email, phone, password, repeatPassword, firstName, lastName } =
      data;
    const toastId = toast.loading("Чекаємо...");

    try {
      await registerUser(
        email,
        phone,
        password,
        repeatPassword,
        firstName,
        lastName
      );
      toast.update(toastId, {
        render: "Успішна реєстрація!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      reset();
      router.push("/auth");
      setIsSignIn(true);
    } catch (error: any) {
      toast.update(toastId, {
        render: checkErrors(error.message),
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };
  return (
    <div
      className={classNames(styles.signUp, {
        [styles.signUp__active]: !isSignIn,
      })}
    >
      <div className={styles.signUp__header}>
        <h4>Реєстрація</h4>
        <p>
          Вже маєте акаунт?{" "}
          <button
            rel="stylesheet"
            type="button"
            onClick={() => setIsSignIn(true)}
          >
            Увійти тут
          </button>
        </p>
      </div>

      <form
        className={styles.signUp__form}
        onSubmit={handleSubmit(handleRegister)}
      >
        <FormInput
          register={register("firstName", {
            required: "Це поле є обов'язковим",
            minLength: {
              value: 2,
              message: "Ім'я повинне містити не менше 2 символів",
            },
            maxLength: {
              value: 30,
              message: "Ім'я повинне містити не більше 30 символів",
            },
          })}
          tabIndex={1}
          placeholder="Введіть ваше ім'я"
          errors={errors.firstName?.message}
        />

        <FormInput
          register={register("lastName", {
            required: "Це поле є обов'язковим",
            minLength: {
              value: 2,
              message: "Прізвище повинне містити не менше 2 символів",
            },
            maxLength: {
              value: 30,
              message: "Прізвище повинне містити не більше 30 символів",
            },
          })}
          tabIndex={2}
          placeholder="Введіть ваше прізвище"
          errors={errors.lastName?.message}
        />

        <FormInput
          register={register("email", { required: "Це поле є обов'язковим" })}
          placeholder="Введіть вашу електронну пошту"
          type="email"
          tabIndex={3}
          errors={errors.email?.message}
        />

        <FormInput
          placeholder="Телефон"
          type="tel"
          tabIndex={4}
          register={register("phone", {
            required: "Це поле є обов'язковим",
            maxLength: {
              value: 13,
              message: "Невірно введенний номер, приклад: +380XXXXXXXXX",
            },
            minLength: {
              value: 13,
              message: "Невірно введенний номер приклад: +380XXXXXXXXX",
            },
          })}
          errors={errors.phone?.message}
        />

        <FormInput
          register={register("password", {
            required: "Це поле є обов'язковим",
            minLength: {
              value: 8,
              message: "Пароль має містити не менше 8 символів",
            },
            maxLength: {
              value: 25,
              message: "Пароль має містити не більше 25 символів",
            },
          })}
          tabIndex={5}
          type="password"
          placeholder="Створіть пароль"
          errors={errors.password?.message}
        />

        <FormInput
          register={register("repeatPassword", {
            required: "Це поле є обов'язковим",
            validate: (value) =>
              value === watch("password") || "Паролі не співпадають",
          })}
          tabIndex={6}
          type="password"
          placeholder="Повторіть пароль"
          errors={errors.repeatPassword?.message}
        />

        <button className={styles.signUp__button} type="submit" tabIndex={7}>
          Зареєструватись
        </button>
      </form>
    </div>
  );
}
