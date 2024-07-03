'use client';
import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './orderForm.module.scss';
import Link from 'next/link';
import { getCities, getWarehouses } from '@/helpers/fetchNovaposhta';
import { IOrderForm } from '@/types/OrderForm';
import FormInput from '@/components/FormInput/FormInput';
import debounce from 'lodash.debounce';
import FormSelect from '@/components/FormSelect/FormSelect';
import { checkWindow } from '@/helpers/checkWindow';
import { ResponseCities } from '@/types/novaposhta/ResponseCities';
import { Warehouse } from '@/types/novaposhta/ResponseWarehouses';
import FormComment from '@/components/FormComment/FormComment';
import Buttons from '@/components/Buttons/Buttons';

type Props = {
  className?: string;
};

export default function OrderForm({ className }: Props) {
  const [cityList, setCityList] = useState<[] | string[]>([]);
  const [warehouseList, setWarehouseList] = useState<[] | string[]>([]);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isLoadingWarehouse, setIsLoadingWarehouse] = useState(false);
  const sessionCity = (checkWindow() && sessionStorage.getItem('city')) || '';
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<IOrderForm>();

  const onSubmit: SubmitHandler<IOrderForm> = (data) => {
    console.log(data);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length >= 3) {
      setIsLoadingCity(true);
      setCityList([]);
      getCities(value)
        .then((data) => {
          setCityList(
            (data as ResponseCities).Addresses.map(
              (item) => `${item.Present} | ${item.DeliveryCity}`
            )
          );
        })
        .catch(() => {
          setCityList([]);
        })
        .finally(() => {
          setIsLoadingCity(false);
        });
    }
  };
  const handleWarehouseChange = useCallback(
    (event?: React.ChangeEvent<HTMLInputElement>) => {
      const value = event?.target.value || '';
      setIsLoadingWarehouse(true);
      getWarehouses(sessionCity, value)
        .then((data) => {
          setWarehouseList(data.map((item) => (item as Warehouse).Description));
        })
        .catch(() => {
          setWarehouseList([]);
        })
        .finally(() => {
          setIsLoadingWarehouse(false);
        });
    },
    [sessionCity]
  );

  const debouncedCityChange = useMemo(
    () => debounce(handleCityChange, 400),
    []
  );

  const debouncedWarehouseChange = useMemo(
    () => debounce(handleWarehouseChange, 400),
    [handleWarehouseChange]
  );

  return (
    <form
      className={classNames([styles.orderForm], [className])}
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
          register={register('phone', {
            required: "Це поле є обов'язковим",
            maxLength: {
              value: 13,
              message: 'Невірно введенний номер, прикдад: +380XXXXXXXXX',
            },
            minLength: {
              value: 13,
              message: 'Невірно введенний номер прикдад: +380XXXXXXXXX',
            },
          })}
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
          isSave
          autocomplete={{
            value: watch('city') || '',
            name: 'city',
            minLength: 3,
            autocompleteList: cityList,
            isLoading: isLoadingCity,
            setValue: setValue,
          }}
        />
        <FormInput
          className={styles.orderForm__input}
          placeholder="Відділення"
          register={register('deliveryPoint', {
            required: "Це поле є обов'язковим",
            onChange: debouncedWarehouseChange,
          })}
          onClickInput={handleWarehouseChange}
          errors={errors.deliveryPoint?.message}
          autocomplete={{
            value: watch('deliveryPoint') || '',
            name: 'deliveryPoint',
            minLength: 0,
            autocompleteList: warehouseList,
            isLoading: isLoadingWarehouse,
            setValue: setValue,
          }}
        />
      </div>

      <div className={styles.orderForm__block}>
        <h3 className={styles.orderForm__title}>Оплата</h3>
        <FormSelect
          defaultText="Варіант оплати"
          register={register('paymentMethod', {
            required: "Це поле є обов'язковим",
          })}
          setValue={setValue}
          itemName="paymentMethod"
          options={{ cash: 'Оплата при отриманні', card: 'Оплата картою' }}
          disabled={['card']}
          errors={errors.paymentMethod?.message}
          clearErrors={clearErrors}
        />
      </div>

      <FormComment
        register={register('comment')}
        buttonText={[
          '+ Додати коментар до замовлення',
          '- Видалити коментар до замовлення',
        ]}
      />
      <Buttons
        firstBtn={{
          className: styles.orderForm__btnSubmit,
          isBuy: true,
          type: 'button',
          btnText: 'Оформити',
        }}
      />
    </form>
  );
}
