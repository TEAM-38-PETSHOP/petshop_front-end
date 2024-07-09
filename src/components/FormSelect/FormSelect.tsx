import { useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import {
  UseFormClearErrors,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form';
import styles from './formSelect.module.scss';

import arrow from '@@/images/icons/smallArrowDown.svg';
import { IOrderForm } from '@/types/OrderForm';

type Props = {
  defaultText: string;
  register: UseFormRegisterReturn;
  options: { [key: string]: string };
  disabled?: string[];
  setValue: UseFormSetValue<IOrderForm>;
  clearErrors: UseFormClearErrors<IOrderForm>;
  itemName: keyof IOrderForm;
  errors: string | undefined;
  className?: string;
};
export default function FormSelect({
  defaultText,
  register,
  setValue,
  clearErrors,
  itemName,
  options,
  disabled,
  errors,
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    clearErrors(itemName);
  };
  const handleClose = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div className={styles.formSelect__wrapper}>
      <select
        className={classNames(styles.formSelect, className, {
          [styles.formSelect__opened]: isOpen,
        })}
        defaultValue=""
        {...register}
        onBlur={handleClose}
        onClick={handleToggle}
      >
        <option
          value=""
          disabled
        >
          {defaultText}
        </option>
        {options &&
          Object.entries(options).map(([key, value]) => (
            <option
              key={key}
              value={key}
              disabled={disabled?.includes(key)}
            >
              {value}
            </option>
          ))}
      </select>
      <Image
        className={classNames(styles.formSelect__arrow, {
          [styles.formSelect__arrowOpened]: isOpen,
        })}
        src={arrow}
        alt="arrow"
        width={15}
        height={15}
      />
      {options && isOpen && (
        <ul className={styles.formSelect__dropdown}>
          {Object.entries(options).map(([key, value]) => (
            <li
              className={classNames(styles.formSelect__dropdown__item, {
                [styles.formSelect__dropdown__itemDisabled]:
                  disabled?.includes(key),
              })}
              key={key}
              onClick={() =>
                !disabled?.includes(key) && setValue(itemName, key)
              }
            >
              {value}
            </li>
          ))}
        </ul>
      )}
      {errors && <span className={styles.formSelect__error}>{errors}</span>}
    </div>
  );
}