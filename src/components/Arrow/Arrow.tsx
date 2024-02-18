import styles from './arrow.module.scss';
import classNames from 'classnames';

type direction = 'left' | 'right' | 'up' | 'down';

type Props = {
  styleName?: string;
  direction?: direction;
  onClick?: () => void;
  isCarousel?: boolean;
};

export default function Arrow({
  styleName,
  direction = 'up',
  onClick,
  isCarousel,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames([styleName], [styles.arrow], {
        [styles[direction]]: direction,
        [styles.arrow__disabled]: isCarousel && !onClick,
      })}
    ></button>
  );
}
