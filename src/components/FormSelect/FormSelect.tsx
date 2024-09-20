import { useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import {
  Path,
  PathValue,
  UseFormClearErrors,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import styles from "./formSelect.module.scss";

import arrow from "@@/images/icons/smallArrowDown.svg";
import { IOrderForm } from "@/types/OrderForm";
import { Feedback } from "@/types";

type Props<T extends IOrderForm | Feedback> = {
  defaultText: string;
  register: UseFormRegisterReturn;
  options: { [key: string]: string };
  disabled?: string[];
  setValue: UseFormSetValue<T>;
  clearErrors: UseFormClearErrors<T>;
  itemName: Path<T>;
  errors: string | undefined;
  className?: string;
};
export default function FormSelect<T extends IOrderForm | Feedback>({
  defaultText,
  register,
  setValue,
  clearErrors,
  itemName,
  options,
  disabled,
  errors,
  className,
}: Props<T>) {
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
        <option value="" disabled>
          {defaultText}
        </option>
        {options &&
          Object.entries(options).map(([key, value]) => (
            <option key={key} value={value} disabled={disabled?.includes(value)}>
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
                  disabled?.includes(value),
              })}
              key={key}
              onClick={() =>
                !disabled?.includes(value) &&
                setValue(itemName, value as PathValue<T, Path<T>>)
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
