import SvgWrapper from '../SvgWrapper/SvgWrapper';
import Link from 'next/link';
import styles from './buttons.module.scss';
import classNames from 'classnames';

type Btn = {
  btnText: string;
  btnLink: string;
  className?: string;
  btnIcon?: string;
  isDisabled?: boolean;
  target?: string;
  onClick?: () => void;
};

type Props = {
  firstBtn: Btn;
  secondBtn?: Btn;
  className?: string;
};

export default function Buttons({ firstBtn, secondBtn, className }: Props) {
  const renderButton = (btn: Btn) => (
    <Link
      target={btn.target || '_self'}
      href={btn.btnLink}
      onClick={btn.onClick}
      className={classNames([styles.btns__btn], {
        [styles.btns__btnSecond]: btn === secondBtn,
        [styles.btns__btnDisabled]: btn.isDisabled,
        [btn.className as string]: btn.className,
      })}
    >
      {btn.btnIcon && <SvgWrapper src={btn.btnIcon} />}
      {btn.btnText}
    </Link>
  );

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
