"use client";

import Buttons from "@/components/Buttons/Buttons";
import FormSelect from "@/components/FormSelect/FormSelect";
import { Feedback } from "@/types";
import { useForm, useFormState } from "react-hook-form";
import { Uploader } from "..";
import styles from "./feedbackFrom.module.scss";
import { toast } from "react-toastify";
import { sendFeedback } from "@/helpers/fetchAuthorization";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/User";

export const FeedbackForm = () => {
  const { data } = useSession();
  const customUser = data?.user as IUser;
  const defaultValues = {
    experience: "",
    comment: "",
    photo: null,
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
  } = useForm<Feedback>({
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const { isValid, isDirty } = useFormState({ control });

  const photo = watch("photo");

  const handleClearFields = () => {
    reset();
    clearErrors();
  };

  const onSubmit = async (data: Feedback) => {
    const toastId = toast.loading("Чекаємо...");
    const formData = new FormData();

    formData.append("experience", data.experience);
    formData.append("message", data.comment);

    if (data.photo && Array.isArray(data.photo)) {
      data.photo.forEach((file) => {
        formData.append("files", file);
      });
    } else if (data.photo) {
      formData.append("files", data.photo);
    } else {
      const emptyFile = new File([""], "empty.txt", { type: "text/plain" });
      formData.append("files", emptyFile);
    }

    try {
      const response = await sendFeedback(formData, customUser?.token);

      if (response) {
        toast.update(toastId, {
          render: "Дані успішно оновлено!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        reset();
        clearErrors();
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

  return (
    <>
      <form className={styles.feedbackForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.feedbackForm__experience}>
          <FormSelect<Feedback>
            register={register("experience", {
              required: "Це поле є обов'язковим",
            })}
            itemName="experience"
            setValue={setValue}
            tabIndex={1}
            defaultText="Обери з чим ти мав досвід"
            options={{ grooming: "Грумінг", shop: "Магазин" }}
            errors={errors.experience?.message}
            clearErrors={clearErrors}
          />
        </div>

        <div className={styles.feedbackForm__comment}>
          <label
            className={styles.feedbackForm__comment__label}
            htmlFor="comment"
          >
            Відгук
          </label>
          <textarea
            className={styles.feedbackForm__textarea}
            placeholder="Опиши свої враження"
            id="comment"
            tabIndex={2}
            rows={5}
            {...register("comment", {
              required: "Це поле є обов'язковим",
              minLength: {
                value: 2,
                message: "Відгук повинен містити більше 2 символів",
              },
              maxLength: {
                value: 500,
                message: "Відгук повинен містити не більше 500 символів",
              },
            })}
          />

          {errors.comment?.message && (
            <span className={styles.feedbackForm__textarea__error}>
              {errors.comment?.message}
            </span>
          )}
        </div>

        <div>
          <Uploader
            register={register("photo")}
            errors={errors.photo?.message}
            onUpload={(file) => setValue("photo", file)}
            previewUrl={photo ? URL.createObjectURL(photo) : null}
          />
        </div>
      </form>

      <div className={styles.feedbackForm__buttons}>
        <Buttons
          firstBtn={{
            btnText: "Очистити",
            type: "button",
            className: styles.feedbackForm__buttonsClear,
            onClick: handleClearFields,
          }}
        />

        <Buttons
          firstBtn={{
            btnText: "Надіслати",
            type: "submit",
            isDisabled: !isDirty || !isValid,
            className: styles.feedbackForm__buttonsSend,
            onClick: handleSubmit(onSubmit),
          }}
        />
      </div>
    </>
  );
};
