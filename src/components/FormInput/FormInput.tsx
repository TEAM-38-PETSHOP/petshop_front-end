'use client';
import React, { HTMLInputTypeAttribute } from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

import styles from './formInput.module.scss';
import { IOrderForm } from '@/types/OrderForm';
import Loader from '../Loader/Loader';

type Props = {
  register: UseFormRegisterReturn;
  errors: string | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  className?: string;
  autocomplete?: {
    setValue: UseFormSetValue<IOrderForm>;
    name: keyof IOrderForm;
    value: string;
    autocompleteList: string[];
    isLoading: boolean;
  };
};
export default React.memo(function FormInput({
  register,
  errors,
  placeholder,
  type = 'text',
  className,
  autocomplete,
}: Props) {
  const isShowList =
    autocomplete &&
    autocomplete.value.length >= 3 &&
    !autocomplete.autocompleteList.includes(autocomplete.value);
  const isShowNoResult =
    autocomplete &&
    autocomplete.autocompleteList.length === 0 &&
    !autocomplete.isLoading;
  return (
    <div>
      <input
        {...register}
        className={classNames(styles.input, className, {
          [styles.input__activeList]: isShowList,
        })}
        placeholder={placeholder}
        type={type}
      />
      {errors && <span className={styles.input__error}>{errors}</span>}
      {isShowList && (
        <div className={styles.autocomplete}>
          {!autocomplete.isLoading && (
            <ul className={styles.autocomplete__list}>
              {autocomplete.autocompleteList.map((item) => (
                <li
                  key={item}
                  onClick={() => autocomplete.setValue(autocomplete.name, item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
          {isShowNoResult && <p>Нічого не знайдено</p>}
          {autocomplete.isLoading && (
            <Loader className={styles.autocomplete__loader} />
          )}
        </div>
      )}
    </div>
  );
});
