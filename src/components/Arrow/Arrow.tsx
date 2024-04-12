'use client';

import { useRouter } from 'next/navigation';
import styles from './arrow.module.scss';
import classNames from 'classnames';

type direction = 'left' | 'right' | 'up' | 'down';

type Props = {
  styleName?: string;
  direction?: direction;
  onClick?: () => void;
  isCarousel?: boolean;
  isWhite?: boolean;
  isBack?: boolean;
};

export default function Arrow({
  styleName,
  direction = 'up',
  onClick,
  isCarousel,
  isWhite,
  isBack,
}: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      data-testid="arrow"
      onClick={isBack ? () => router.back() : onClick}
      className={classNames([styleName], [styles.arrow], {
        [styles[direction]]: direction,
        [styles.arrow__white]: isWhite,
        [styles.arrow__disabled]: isCarousel && !onClick,
      })}
    ></button>
  );
}
