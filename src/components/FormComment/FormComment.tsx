import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';
import styles from './formComment.module.scss';

type Props = {
  register: UseFormRegisterReturn;
  buttonText: [string, string];
  placeholder?: string;
  className?: string;
};
export default function FormComment({
  register,
  buttonText,
  placeholder,
  className,
}: Props) {
  const [isComment, setIsComment] = useState(false);
  const toggleComment = () => setIsComment(!isComment);
  return (
    <div className={classNames([styles.formComment], className)}>
      <button
        className={styles.formComment__btn}
        type="button"
        onClick={toggleComment}
      >
        {isComment ? buttonText[1] : buttonText[0]}
      </button>
      <textarea
        className={classNames([styles.formComment__textarea], {
          [styles.formComment__textareaActive]: isComment,
        })}
        placeholder={placeholder}
        {...register}
      />
    </div>
  );
}
