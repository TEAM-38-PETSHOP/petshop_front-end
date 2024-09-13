"use client";

import FormInput from "@/components/FormInput/FormInput";
import { ContactInfoForm, ServiceModalName } from "@/types";
import { useForm, useFormState } from "react-hook-form";
import styles from "./contactForm.module.scss";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { addServiceModal } from "@/redux/features/serviceModalSlice";
import Buttons from "@/components/Buttons/Buttons";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef } from "react";
import { IUser } from "@/types/User";
import { updateUserInfo } from "@/helpers/fetchAuthorization";

export const ContactForm = () => {
  const { data, update } = useSession();
  const customUser = data?.user as IUser;
  const initialValuesRef = useRef<ContactInfoForm | null>(null);
  const dispatch = useAppDispatch();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    newPasswordRepeat: "",
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ContactInfoForm>({
    defaultValues: defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (customUser) {
      (Object.keys(defaultValues) as Array<keyof ContactInfoForm>).forEach(
        (key) => {
          const value = customUser[key as keyof typeof customUser];
          if (key in customUser) {
            setValue(key, String(value));
          }
        }
      );
    }

    initialValuesRef.current = getValues();
  }, [customUser, setValue, getValues]);

  const [
    firstName,
    lastName,
    email,
    phone,
    oldPassword,
    newPassword,
    newPasswordRepeat,
  ] = watch([
    "firstName",
    "lastName",
    "email",
    "phone",
    "oldPassword",
    "newPassword",
    "newPasswordRepeat",
  ]);

  const hasChanges = useCallback(() => {
    const currentValues = getValues();
    return Object.keys(defaultValues).some((key) => {
      return (
        currentValues[key as keyof ContactInfoForm] !==
        initialValuesRef.current?.[key as keyof ContactInfoForm]
      );
    });
  }, [
    firstName,
    lastName,
    email,
    phone,
    oldPassword,
    newPassword,
    newPasswordRepeat,
  ]);

  const { isValid } = useFormState({ control });

  const onSubmit = async (data: ContactInfoForm) => {
    const toastId = toast.loading("Чекаємо...");
    try {
      const response = await updateUserInfo(data, customUser?.token);

      if (response) {
        await update({
          user: {
            ...customUser,
            ...(response as IUser),
          },
        });

        toast.update(toastId, {
          render: "Дані успішно оновлено!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        initialValuesRef.current = getValues();
        reset();
        clearErrors();
      } else {
        toast.update(toastId, {
          render: "Помилка оновлення!",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Сталася помилка!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const handleForgotPassword = () => {
    dispatch(addServiceModal({ type: ServiceModalName.MakeCheckEmail }));
  };

  const handleDeleteAccount = () => {
    dispatch(
      addServiceModal({
        type: ServiceModalName.AreYouSure,
        payload: {
          userId: customUser?.id,
          token: customUser?.token,
        },
      })
    );
  };

  return (
    <>
      <form className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.contactForm__inputWrapper}>
          <FormInput
            register={register("firstName", {
              required: "Це обовʼязкове поле",
              minLength: {
                value: 2,
                message: "Ім'я повинне містити не менше 2 символів",
              },
              maxLength: {
                value: 30,
                message: "Ім'я повинне містити не більше 30 символів",
              },
            })}
            placeholder="Введіть ім'я"
            label="Ваше ім'я"
            errors={errors.firstName?.message}
            tabIndex={1}
          />
        </div>

        <div className={styles.contactForm__inputWrapper}>
          <FormInput
            register={register("lastName", {
              required: "Це обовʼязкове поле",
              minLength: {
                value: 2,
                message: "Прізвище повинне містити не менше 2 символів",
              },
              maxLength: {
                value: 30,
                message: "Прізвище повинне містити не більше 30 символів",
              },
            })}
            placeholder="Введіть прізвище"
            label="Прізвище"
            errors={errors.lastName?.message}
            tabIndex={2}
          />
        </div>

        <div className={styles.contactForm__inputWrapper}>
          <FormInput
            register={register("email", {
              required: "Це обовʼязкове поле",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Невірно введена пошта",
              },
            })}
            placeholder="Введіть електронну пошту"
            label="E-mail / Логін"
            errors={errors.email?.message}
            tabIndex={3}
          />
        </div>

        <div className={styles.contactForm__inputWrapper}>
          <FormInput
            register={register("phone", {
              required: "Це обовʼязкове поле",
              maxLength: {
                value: 13,
                message: "Невірно введенний номер, приклад: +380XXXXXXXXX",
              },
              minLength: {
                value: 13,
                message: "Невірно введенний номер приклад: +380XXXXXXXXX",
              },
            })}
            placeholder="Введіть номер телефону"
            label="Номер телефону"
            errors={errors.phone?.message}
            tabIndex={4}
          />
        </div>

        <div className={styles.contactForm__inputWrapper}>
          <FormInput
            register={register("oldPassword", {
              minLength: {
                value: 8,
                message: "Пароль має містити не менше 8 символів",
              },
              maxLength: {
                value: 25,
                message: "Пароль має містити не більше 25 символів",
              },
            })}
            placeholder="Введіть останній створений вами пароль"
            type="password"
            label="Старий пароль"
            errors={errors.oldPassword?.message}
            tabIndex={5}
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
            register={register("newPassword", {
              minLength: {
                value: 8,
                message: "Пароль має містити не менше 8 символів",
              },
              maxLength: {
                value: 25,
                message: "Пароль має містити не більше 25 символів",
              },
            })}
            placeholder="Введіть новий пароль (напр. Qwerty12345)"
            type="password"
            label="Новий пароль"
            errors={errors.newPassword?.message}
            tabIndex={6}
          />
        </div>

        <div className={styles.contactForm__inputWrapper}>
          <FormInput
            register={register("newPasswordRepeat", {
              minLength: {
                value: 8,
                message: "Пароль має містити не менше 8 символів",
              },
              maxLength: {
                value: 25,
                message: "Пароль має містити не більше 25 символів",
              },
              validate: (value) =>
                value === watch("newPassword") || "Паролі не співпадають",
            })}
            placeholder="Повторно введіть новий пароль"
            type="password"
            label="Підтвердження пароля"
            errors={errors.newPasswordRepeat?.message}
            tabIndex={7}
          />
        </div>
      </form>

      <div className={styles.contactForm__buttons}>
        <Buttons
          firstBtn={{
            btnText: "Видалити акаунт",
            type: "button",
            className: styles.contactForm__buttonsDelete,
            onClick: handleDeleteAccount,
          }}
        />
        <Buttons
          firstBtn={{
            btnText: "Зберегти",
            type: "submit",
            isDisabled: !hasChanges() || !isValid,
            className: styles.contactForm__buttonsSave,
            onClick: handleSubmit(onSubmit),
          }}
        />
      </div>
    </>
  );
};
