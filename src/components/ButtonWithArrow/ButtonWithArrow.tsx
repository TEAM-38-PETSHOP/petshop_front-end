import classNames from 'classnames';
import styles from './buttonWithArrow.module.scss';

type variants = 'white' | 'green' | 'orange';
type Props = {
  text: string;
  variant?: variants;
  onClick?: () => void;
  classNameBtn?: string;
};
export default function ButtonWithArrow({
  text,
  variant,
  onClick,
  classNameBtn,
}: Props) {
  return (
    <button
      className={classNames([styles.buttonWithArrow], [classNameBtn], {
        [styles.buttonWithArrowGreen]: variant === 'green',
        [styles.buttonWithArrowOrange]: variant === 'orange',
      })}
      onClick={onClick}
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
  );
}
