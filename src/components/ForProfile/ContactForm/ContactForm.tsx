import FormInput from "@/components/FormInput/FormInput";
import { ContactInfoForm } from "@/types";
import { useForm } from "react-hook-form";
import styles from "./contactForm.module.scss";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { addServiceModal } from "@/redux/features/serviceModalSlice";
import Buttons from "@/components/Buttons/Buttons";

export const ContactForm = () => {
  const dispatch = useAppDispatch();
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactInfoForm>({ defaultValues: defaultValues });

  const onSubmit = (data: ContactInfoForm) => {
    console.log(data);
  };

  const handleForgotPassword = () => {
    // dispatch(addServiceModal({ type: ServiceModalName.MakeCheckEmailModal }))
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.contactForm__inputWrapper}>
        <FormInput
          register={register("firstName")}
          placeholder="Введіть ім'я"
          label="Ваше ім'я"
          errors={errors.firstName?.message}
        />
      </div>

      <div className={styles.contactForm__inputWrapper}>
        <FormInput
          register={register("lastName")}
          placeholder="Введіть прізвище"
          label="Прізвище"
          errors={errors.lastName?.message}
        />
      </div>

      <div className={styles.contactForm__inputWrapper}>
        <FormInput
          register={register("email")}
          placeholder="Введіть електронну пошту"
          label="E-mail / Логін"
          errors={errors.email?.message}
        />
      </div>

      <div className={styles.contactForm__inputWrapper}>
        <FormInput
          register={register("phoneNumber")}
          placeholder="Введіть номер телефону"
          label="Номер телефону"
          errors={errors.phoneNumber?.message}
        />
      </div>

      <div className={styles.contactForm__inputWrapper}>
        <FormInput
          register={register("oldPassword")}
          placeholder="Введіть останній створений вами пароль"
          type="password"
          label="Старий пароль"
          errors={errors.oldPassword?.message}
        />

        <button
          onClick={handleForgotPassword}
          type="button"
          className={styles.contactForm__forgotPassword}
        >
          Забули пароль?
        </button>
      </div>

      <div className={styles.contactForm__inputWrapper}>
        <FormInput
          register={register("newPassword")}
          placeholder="Введіть новий пароль (напр. Qwerty12345)"
          type="password"
          label="Новий пароль"
          errors={errors.newPassword?.message}
        />
      </div>

      <div className={styles.contactForm__inputWrapper}>
        <FormInput
          register={register("confirmPassword")}
          placeholder="Повторно введіть новий пароль"
          type="password"
          label="Підтвердження пароля"
          errors={errors.confirmPassword?.message}
        />
      </div>

      <div className={styles.contactForm__buttons}>
        <Buttons
          firstBtn={{
            btnText: "Видалити акаунт",
            type: "button",
            className: styles.contactForm__buttonsDelete,
            onClick: () => {},
          }}
        />
        <Buttons
          firstBtn={{
            btnText: "Зберегти",
            type: "submit",
            className: styles.contactForm__buttonsSave,
            onClick: handleSubmit(onSubmit),
          }}
        />
      </div>
    </form>
  );
};
