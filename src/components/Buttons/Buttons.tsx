import Link from 'next/link';
import styles from './buttons.module.scss';
import classNames from 'classnames';
import Image from 'next/image';

type Btn = {
  btnText: string;
  btnLink: string;
  btnIcon?: string;
  isDisabled?: boolean;
};

type Props = {
  firstBtn: Btn;
  secondBtn?: Btn;
};

export default function Buttons({ firstBtn, secondBtn }: Props) {
  return (
    <>
      {secondBtn ? (
        <div className={styles.btns}>
          <Link
            href={firstBtn.btnLink}
            className={classNames([styles.btns__btn], {
              [styles.btns__btnDisabled]: firstBtn.isDisabled,
            })}
          >
            {firstBtn.btnIcon && (
              <Image
                src={firstBtn.btnIcon}
                alt={firstBtn.btnText}
              />
            )}
            {firstBtn.btnText}
          </Link>
          <Link
            href={secondBtn.btnLink}
            className={classNames([styles.btns__btn], {
              [styles.btns__btnSecond]: secondBtn,
              [styles.btns__btnDisabled]: secondBtn.isDisabled,
            })}
          >
            {secondBtn.btnIcon && (
              <Image
                src={secondBtn.btnIcon}
                alt={secondBtn.btnText}
              />
            )}
            {secondBtn.btnText}
          </Link>
        </div>
      ) : (
        <Link
          href={firstBtn.btnLink}
          className={classNames([styles.btns__btn], {
            [styles.btns__btnDisabled]: firstBtn.isDisabled,
          })}
        >
          {firstBtn.btnIcon && (
            <Image
              src={firstBtn.btnIcon}
              alt={firstBtn.btnText}
            />
          )}
          {firstBtn.btnText}
        </Link>
      )}
    </>
  );
}
