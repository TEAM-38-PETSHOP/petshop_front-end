'use client';
import React, { HTMLInputTypeAttribute, memo, useState } from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

import styles from './formInput.module.scss';
import { IOrderForm } from '@/types/OrderForm';
import Loader from '../Loader/Loader';
import { checkWindow } from '@/helpers/checkWindow';

type Props = {
  register: UseFormRegisterReturn;
  errors: string | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  className?: string;
  isSave?: boolean;
  onClickInput?: () => void;
  offBrowserAutocomplete?: boolean;
  autocomplete?: {
    setValue: UseFormSetValue<IOrderForm>;
    minLength: number;
    name: keyof IOrderForm;
    value: string;
    autocompleteList: string[];
    isLoading: boolean;
  };
};
export default memo(function FormInput({
  register,
  errors,
  placeholder,
  isSave,
  onClickInput,
  type = 'text',
  className,
  offBrowserAutocomplete,
  autocomplete,
}: Props) {
  const [isFocus, setIsFocus] = useState(false);
  const isShowList =
    isFocus &&
    autocomplete &&
    autocomplete.value.length >= autocomplete.minLength &&
    !autocomplete.autocompleteList.includes(autocomplete.value);
  const isShowNoResult =
    autocomplete &&
    autocomplete.autocompleteList.length === 0 &&
    !autocomplete.isLoading;

  const handleClick = (item: string) => {
    if (autocomplete) {
      autocomplete.setValue(autocomplete.name, item);

      const regex = /^(.*?)\s*\|\s*(.*?)$/;
      const match = item.match(regex);
      const itemRef = match ? match[2] : '';

      if (isSave && checkWindow()) {
        window.sessionStorage.setItem(autocomplete.name, itemRef);
      }
    }
  };
  const handleBlur = () => {
    setTimeout(() => setIsFocus(false), 200);
  };
  return (
    <div
      onClick={() => setIsFocus(true)}
      onBlur={handleBlur}
    >
      <input
        {...register}
        className={classNames(styles.input, className, {
          [styles.input__activeList]: isShowList,
        })}
        onClick={onClickInput}
        autoComplete={offBrowserAutocomplete ? 'off' : ''}
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
                  onClick={() => handleClick(item)}
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
