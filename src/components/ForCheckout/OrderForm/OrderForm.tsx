"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./orderForm.module.scss";
import Link from "next/link";
import { getCities, getWarehouses } from "@/helpers/fetchNovaposhta";
import { IOrderForm } from "@/types/OrderForm";
import FormInput from "@/components/FormInput/FormInput";
import debounce from "lodash.debounce";
import FormSelect from "@/components/FormSelect/FormSelect";
import { checkWindow } from "@/helpers/checkWindow";
import { ResponseCities } from "@/types/novaposhta/ResponseCities";
import { Warehouse } from "@/types/novaposhta/ResponseWarehouses";
import FormComment from "@/components/FormComment/FormComment";
import Buttons from "@/components/Buttons/Buttons";
import {
  createOrderWithAuth,
  createOrderWithoutAuth,
} from '@/helpers/fetchOrder';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { Product } from '@/types/Product';
import { useSession } from 'next-auth/react';
import { IUser } from '@/types/User';
import { setCartProducts as setCartProductsRedux } from '@/redux/features/cartSlice';
import { addServiceModal } from '@/redux/features/serviceModalSlice';
import { ServiceModalName } from '@/types';

type Props = {
  className?: string;
};

export default function OrderForm({ className }: Props) {
  const { status, data } = useSession();
  const isAuthenticated = status === "authenticated";
  const customUser = data?.user as IUser;
  const dispatch = useAppDispatch();
  const [cityList, setCityList] = useState<[] | string[]>([]);
  const [warehouseList, setWarehouseList] = useState<[] | string[]>([]);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isLoadingWarehouse, setIsLoadingWarehouse] = useState(false);
  const cartProductsState = useAppSelector((state) => state.cart.cartProducts);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const sessionCity = (checkWindow() && sessionStorage.getItem("city")) || "";
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm<IOrderForm>();

  useEffect(() => {
    setCartProducts(cartProductsState.map((product) => product.product));
  }, [cartProductsState]);

  useEffect(() => {
    setValue("firstName", customUser?.firstName);
    setValue("lastName", customUser?.lastName);
    setValue("phone", customUser?.phone);
    setValue("email", customUser?.email);

    return () => {
      sessionStorage.removeItem("city");
    };
  }, [customUser, setValue]);

  const onSubmit: SubmitHandler<IOrderForm> = (data) => {
    if (isAuthenticated) {
      const orderData = {
        city: data.city,
        street: "",
        building: "",
        apartment: "",
        officeNovaPost: data.deliveryPoint,
        comment: data.comment,
      };

      createOrderWithAuth(orderData, customUser.token)
        .then(() => {
          dispatch(
            addServiceModal({ type: ServiceModalName.MakeOrderSuccess })
          );
          reset();
          dispatch(setCartProductsRedux([]));
        })
        .catch(() => {
          dispatch(addServiceModal({ type: ServiceModalName.MakeOrderError }));
        });
    } else {
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

      createOrderWithoutAuth(orderData)
        .then(() => {
          dispatch(
            addServiceModal({ type: ServiceModalName.MakeOrderSuccess })
          );
          reset();
          dispatch(setCartProductsRedux([]));
        })
        .catch(() => {
          dispatch(addServiceModal({ type: ServiceModalName.MakeOrderError }));
        });
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("deliveryPoint", "");
    checkWindow() && sessionStorage.removeItem("city");

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
      const value = event?.target.value || "";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {!isAuthenticated && (
            <p>
              Щоб не вводити інформацію власноруч,{" "}
              <Link
                href={`/auth?callbackUrl=${encodeURIComponent(
                  checkWindow() ? window.location.href : "/"
                )}`}
              >
                Увійти тут
              </Link>
            </p>
          )}
        </div>
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
          disabled={isAuthenticated}
          placeholder="Ім'я одержувача"
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
          disabled={isAuthenticated}
          placeholder="Прізвище одержувача"
          errors={errors.lastName?.message}
        />
        <FormInput
          type="tel"
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
          tabIndex={3}
          disabled={isAuthenticated}
          placeholder="Телефон"
          errors={errors.phone?.message}
        />
        <FormInput
          register={register("email", {
            required: "Це поле є обов'язковим",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Невірно введена пошта",
            },
          })}
          tabIndex={4}
          type="email"
          disabled={isAuthenticated}
          placeholder="Електронна пошта"
          errors={errors.email?.message}
        />
      </div>

      <div className={styles.orderForm__block}>
        <h3 className={styles.orderForm__title}>Доставка</h3>
        <FormInput
          className={styles.orderForm__input}
          placeholder="Місто"
          register={register("city", {
            required: "Це поле є обов'язковим",
            onChange: debouncedCityChange,
          })}
          errors={errors.city?.message}
          tabIndex={5}
          isSave
          offBrowserAutocomplete
          autocomplete={{
            value: watch("city") || "",
            name: "city",
            minLength: 3,
            autocompleteList: cityList,
            isLoading: isLoadingCity,
            setValue: setValue,
          }}
        />
        <FormInput
          className={styles.orderForm__input}
          disabled={!sessionCity}
          placeholder="Відділення Нової пошти"
          register={register("deliveryPoint", {
            required: "Це поле є обов'язковим",
            onChange: debouncedWarehouseChange,
          })}
          tabIndex={6}
          onClickInput={handleWarehouseChange}
          errors={errors.deliveryPoint?.message}
          offBrowserAutocomplete
          autocomplete={{
            value: watch("deliveryPoint") || "",
            name: "deliveryPoint",
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
          register={register("paymentMethod", {
            required: "Це поле є обов'язковим",
          })}
          setValue={setValue}
          tabIndex={7}
          itemName="paymentMethod"
          options={{ cash: "Оплата при отриманні", card: "Оплата картою" }}
          disabled={["card"]}
          errors={errors.paymentMethod?.message}
          clearErrors={clearErrors}
        />
      </div>

      <FormComment
        register={register("comment")}
        buttonText={[
          "+ Додати коментар до замовлення",
          "- Видалити коментар до замовлення",
        ]}
      />
      <Buttons
        firstBtn={{
          className: styles.orderForm__btnSubmit,
          isBuy: true,
          type: "button",
          btnText: "Оформити",
          tabIndex: 8
        }}
      />
    </form>
  );
}
