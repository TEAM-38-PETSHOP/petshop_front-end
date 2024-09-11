import SvgWrapper from '../SvgWrapper/SvgWrapper';
import Link from 'next/link';
import styles from './buttons.module.scss';
import classNames from 'classnames';

type Btn = {
  btnText: string;
  btnLink?: string;
  className?: string;
  btnIcon?: string;
  isDisabled?: boolean;
  target?: string;
  onClick?: () => void;
  isBuy?: boolean;
  children?: React.ReactNode;
  type?: 'button' | 'link' | 'submit';
};

type Props = {
  firstBtn: Btn;
  secondBtn?: Btn;
  className?: string;
};

export default function Buttons({ firstBtn, secondBtn, className }: Props) {
  const renderButton = (btn: Btn) => {
    if (btn.type === 'button')
      return (
        <button
          onClick={btn.onClick}
          className={classNames([styles.btns__btn], {
            [styles.btns__btnSecond]: btn === secondBtn,
            [styles.btns__btnDisabled]: btn.isDisabled,
            [styles.btns__btnBuy]: btn.isBuy,
            [btn.className as string]: btn.className,
          })}
        >
          {btn.btnIcon && <SvgWrapper src={btn.btnIcon} />}
          {btn.btnText}
          {btn.children}
        </button>
      );

      if (btn.type === 'submit')
      return (
        <button
          onClick={btn.onClick}
          type={btn.type}
          className={classNames([styles.btns__btn], {
            [styles.btns__btnSecond]: btn === secondBtn,
            [styles.btns__btnDisabled]: btn.isDisabled,
            [styles.btns__btnBuy]: btn.isBuy,
            [btn.className as string]: btn.className,
          })}
        >
          {btn.btnIcon && <SvgWrapper src={btn.btnIcon} />}
          {btn.btnText}
          {btn.children}
        </button>
      );

    return (
      <Link
        target={btn.target || '_self'}
        onClick={btn.onClick}
        href={btn.btnLink || ''}
        className={classNames([styles.btns__btn], {
          [styles.btns__btnBuy]: btn.isBuy,
          [styles.btns__btnSecond]: btn === secondBtn,
          [styles.btns__btnDisabled]: btn.isDisabled,
          [btn.className as string]: btn.className,
        })}
      >
        {btn.btnIcon && <SvgWrapper src={btn.btnIcon} />}
        {btn.btnText}
        {btn.children}
      </Link>
    );
  };

  return (
    <>
      {secondBtn ? (
        <div className={classNames([styles.btns], [className])}>
          {renderButton(firstBtn)}
          {renderButton(secondBtn)}
        </div>
      ) : (
        renderButton(firstBtn)
      )}
    </>
  );
}
