import classNames from 'classnames';
import styles from './buttonWithArrow.module.scss';
import Link from 'next/link';

type variants = 'white' | 'green' | 'orange';

type Props = {
  text: string;
  href: string;
  variant?: variants;
  classNameBtn?: string;
  type?: 'link' | 'button';
};
export default function ButtonWithArrow({
  text,
  href,
  variant,
  classNameBtn,
  type =  'link',
}: Props) {
  return (
    type === 'link' ? (
      <Link
        href={href}
        className={classNames([styles.buttonWithArrow], [classNameBtn], {
          [styles.buttonWithArrowGreen]: variant === 'green',
          [styles.buttonWithArrowOrange]: variant === 'orange',
        })}
        type="button"
      >
        {text}
        <span
          className={classNames([styles.buttonWithArrow__arrow], {
            [styles.buttonWithArrow__arrowGreen]: variant === 'green',
            [styles.buttonWithArrow__arrowOrange]: variant === 'orange',
          })}
        />
      </Link>
    ) : (
      <button
        className={classNames([styles.buttonWithArrow], [classNameBtn], {
          [styles.buttonWithArrowGreen]: variant === 'green',
          [styles.buttonWithArrowOrange]: variant === 'orange',
        })}
        type="button"
      >
        {text}
        <span
          className={classNames([styles.buttonWithArrow__arrow], {
            [styles.buttonWithArrow__arrowGreen]: variant === 'green',
            [styles.buttonWithArrow__arrowOrange]: variant === 'orange',
          })}
        />
      </button>
    )
  );
}
