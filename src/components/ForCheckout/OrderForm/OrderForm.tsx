'use client';
import React, { useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './orderForm.module.scss';
import Link from 'next/link';
import { getCities } from '@/helpers/fetchNovaposhta';
import { IOrderForm } from '@/types/OrderForm';
import FormInput from '@/components/FormInput/FormInput';
import debounce from 'lodash.debounce';

export default function OrderForm() {
  const [cityList, setCityList] = React.useState<[] | string[]>([]);
  const [isLoadingCity, setIsLoadingCity] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IOrderForm>();

  const onSubmit: SubmitHandler<IOrderForm> = (data) => {
    console.log(data);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value.length >= 3) {
      setIsLoadingCity(true);
      setCityList([]);
      getCities(value)
        .then((data) => {
          setCityList(data.Addresses.map((item) => item.Present));
        })
        .catch(() => {
          setCityList([]);
        })
        .finally(() => {
          setIsLoadingCity(false);
        });
    }
  };

  const debouncedCityChange = useMemo(
    () => debounce(handleCityChange, 400),
    []
  );

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
        <FormInput
          register={register('firstName', {
            required: "Це поле є обов'язковим",
          })}
          placeholder="Ім'я одержувача"
          errors={errors.firstName?.message}
        />
        <FormInput
          register={register('lastName', {
            required: "Це поле є обов'язковим",
          })}
          placeholder="Прізвище одержувача"
          errors={errors.lastName?.message}
        />
        <FormInput
          placeholder="Телефон"
          type="tel"
          register={register('phone', { required: "Це поле є обов'язковим" })}
          errors={errors.phone?.message}
        />
      </div>

      <div className={styles.orderForm__block}>
        <h3 className={styles.orderForm__title}>Доставка</h3>
        <FormInput
          className={styles.orderForm__input}
          placeholder="Місто"
          register={register('city', {
            required: "Це поле є обов'язковим",
            onChange: debouncedCityChange,
          })}
          errors={errors.city?.message}
          autocomplete={{
            value: watch('city') || '',
            autocompleteList: cityList,
            isLoading: isLoadingCity,
            setValue: setValue,
          }}
        />
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
