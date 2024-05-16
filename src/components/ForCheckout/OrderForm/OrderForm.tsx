'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './orderForm.module.scss';
import Link from 'next/link';

type FormInputs = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  deliveryMethod: string;
  deliveryPoint: string;
  paymentMethod: string;
  comment?: string;
};

export default function OrderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      className={styles.orderForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.orderForm__block}>
        <div className={styles.orderForm__titleWrapper}>
          <h3 className={styles.orderForm__title}>Контакти</h3>
          <p>
            Щоб не вводити інформацію власноруч,{' '}
            <Link href="#">Увійти тут</Link>
          </p>
        </div>
        <input
          className={styles.orderForm__input}
          placeholder="Ім'я одержувача"
          {...register('firstName', { required: "Це поле є обов'язковим" })}
        />
        {errors.firstName && (
          <span className={styles.orderForm__error}>
            {errors.firstName.message}
          </span>
        )}
        <input
          className={styles.orderForm__input}
          placeholder="Прізвище одержувача"
          {...register('lastName', { required: "Це поле є обов'язковим" })}
        />
        {errors.lastName && (
          <span className={styles.orderForm__error}>
            {errors.lastName.message}
          </span>
        )}
        <input
          className={styles.orderForm__input}
          placeholder="Телефон"
          type="tel"
          {...register('phone', { required: "Це поле є обов'язковим" })}
        />
        {errors.phone && (
          <span className={styles.orderForm__error}>
            {errors.phone.message}
          </span>
        )}
      </div>

      <div className={styles.orderForm__block}>
        <h3 className={styles.orderForm__title}>Доставка</h3>
        <input
          className={styles.orderForm__input}
          placeholder="Місто"
          {...register('city', { required: "Це поле є обов'язковим" })}
        />
        {errors.city && (
          <span className={styles.orderForm__error}>{errors.city.message}</span>
        )}
        <select
          className={styles.orderForm__select}
          defaultValue=""
          {...register('deliveryMethod', {
            required: "Це поле є обов'язковим",
          })}
        >
          <option
            value=""
            disabled
          >
            Cпосіб доставки
          </option>
          <option value="courier">Кур&apos;єр</option>
          <option value="pickup">Самовивіз</option>
        </select>
        {errors.deliveryMethod && (
          <span className={styles.orderForm__error}>
            {errors.deliveryMethod.message}
          </span>
        )}
        <select
          className={styles.orderForm__select}
          defaultValue=""
          {...register('deliveryPoint', {
            required: "Це поле є обов'язковим",
          })}
        >
          <option
            value=""
            disabled
          >
            Відділення
          </option>
          <option value="courier">Кур&apos;єр</option>
          <option value="pickup">Самовивіз</option>
        </select>
        {errors.deliveryPoint && (
          <span className={styles.orderForm__error}>
            {errors.deliveryPoint.message}
          </span>
        )}
      </div>

      <div className={styles.orderForm__block}>
        <h3 className={styles.orderForm__title}>Оплата</h3>
        <select
          defaultValue=""
          className={styles.orderForm__select}
          {...register('paymentMethod', { required: "Це поле є обов'язковим" })}
        >
          <option
            value=""
            disabled
          >
            Варіант оплати
          </option>
          <option value="creditCard">Кредитна картка</option>
          <option value="creditCard">Кредитна картка</option>
          <option value="cash">Готівка</option>
        </select>
        {errors.paymentMethod && (
          <span className={styles.orderForm__error}>
            {errors.paymentMethod.message}
          </span>
        )}
      </div>

      <textarea
        placeholder="Додати коментар до замовлення"
        {...register('comment')}
      />

      <button type="submit">Оформити</button>
    </form>
  );
}
