'use client';
import React, { HTMLInputTypeAttribute, memo, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { checkWindow } from '@/helpers/checkWindow';

import styles from './formInput.module.scss';
import { IOrderForm } from '@/types/OrderForm';
import Loader from '../Loader/Loader';
import eyeIcon from '@@/images/icons/eye.svg';

type Props = {
  register: UseFormRegisterReturn;
  errors: string | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  isSave?: boolean;
  children?: React.ReactNode;
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
  disabled,
  isSave,
  onClickInput,
  type = 'text',
  className,
  offBrowserAutocomplete,
  autocomplete,
  children,
}: Props) {
  const [isFocus, setIsFocus] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const isShowList =
    isFocus &&
    autocomplete &&
    autocomplete.value.length >= autocomplete.minLength &&
    !autocomplete.autocompleteList.includes(autocomplete.value);
  const isShowNoResult =
    autocomplete &&
    autocomplete.autocompleteList.length === 0 &&
    !autocomplete.isLoading;

  const handleClick = (textInfo: string, itemRef?: string) => {
    if (autocomplete) {
      autocomplete.setValue(autocomplete.name, textInfo.trim());

      if (isSave && itemRef && checkWindow()) {
        window.sessionStorage.setItem(autocomplete.name, itemRef.trim());
      }
    }
  };
  const handleBlur = () => {
    setTimeout(() => setIsFocus(false), 200);
  };
  return (
    <div
      className={classNames(styles.input__wrapper)}
      onClick={() => setIsFocus(true)}
      onBlur={handleBlur}
    >
      <input
        {...register}
        className={classNames(styles.input, className, {
          [styles.input__activeList]: isShowList,
        })}
        disabled={disabled}
        onClick={onClickInput}
        autoComplete={offBrowserAutocomplete ? 'off' : ''}
        placeholder={placeholder}
        type={
          type === 'password' ? (isShowPassword ? 'text' : 'password') : type
        }
      />

      {children}

      {type === 'password' && (
        <button
          type="button"
          className={styles.input__btn}
          onClick={() => setIsShowPassword(!isShowPassword)}
        >
          <Image
            src={eyeIcon}
            alt="eye"
            width={20}
            height={20}
          />
        </button>
      )}
      {errors && <span className={styles.input__error}>{errors}</span>}
      {isShowList && (
        <div className={styles.autocomplete}>
          {!autocomplete.isLoading && (
            <ul className={styles.autocomplete__list}>
              {autocomplete.autocompleteList.map((item) => {
                const [textInfo, itemRef] = item.split('|');
                return (
                  <li
                    key={item}
                    onClick={() => handleClick(textInfo, itemRef)}
                  >
                    {textInfo}
                    <span hidden>{itemRef}</span>
                  </li>
                );
              })}
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
