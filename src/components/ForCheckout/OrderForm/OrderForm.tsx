'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { createOrder } from '@/helpers/fetchOrder';
import { useAppSelector } from '@/hooks/reduxHooks';
import { Product } from '@/types/Product';

type Props = {
  className?: string;
};

export default function OrderForm({ className }: Props) {
  const [cityList, setCityList] = useState<[] | string[]>([]);
  const [warehouseList, setWarehouseList] = useState<[] | string[]>([]);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isLoadingWarehouse, setIsLoadingWarehouse] = useState(false);
  const cartProductsState = useAppSelector((state) => state.cart.cartProducts);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  useEffect(() => {
    setCartProducts(cartProductsState.map((product) => product.product));
  }, [cartProductsState]);

  const sessionCity = (checkWindow() && sessionStorage.getItem('city')) || '';
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm<IOrderForm>();

  const onSubmit: SubmitHandler<IOrderForm> = (data) => {
    const cartItems = cartProducts.map((item) => {
      const quantity = checkWindow()
        ? +(localStorage.getItem(item.productId.toString()) || 1)
        : 1;
      return {
        productId: item.productId,
        quantity: quantity,
      };
    });

    const orderData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      address: {
        city: data.city,
        officeNovaPost: data.deliveryPoint,
        comment: data.comment,
      },
      cartItems: cartItems,
    };

    createOrder(orderData)
      .then(() => {
        reset();
        alert('Ваше замовлення прийнято!');
      })
      .catch(() => {
        alert(
          'Виникла якась помилка, спробуйте ще раз пізніше або зверніться до служби підтримки'
        );
      });
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
          setWarehouseList(
            data.map(
              (item) =>
                `${(item as Warehouse).Description}, ${
                  (item as Warehouse).CityDescription
                }`
            )
          );
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
        <FormInput
          register={register('email', {
            required: "Це поле є обов'язковим",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Невірно введена пошта',
            },
          })}
          type="email"
          placeholder="Електронна пошта"
          errors={errors.email?.message}
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
          offBrowserAutocomplete
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
          offBrowserAutocomplete
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
