import Link from 'next/link';
import styles from './buttons.module.scss';
import classNames from 'classnames';
import Image from 'next/image';

type Btn = {
  btnText: string;
  btnLink: string;
  className?: string;
  btnIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
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
  const renderButton = (Btn: Btn) => (
    <Link
      target={Btn.target || '_self'}
      href={Btn.btnLink}
      onClick={Btn.onClick}
      className={classNames([styles.btns__btn], {
        [styles.btns__btnSecond]: Btn === secondBtn,
        [styles.btns__btnDisabled]: Btn.isDisabled,
        [Btn.className as string]: Btn.className,
      })}
    >
      {Btn.btnIcon && <Btn.btnIcon />}
      {Btn.btnText}
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
