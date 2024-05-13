'use client';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './limitedText.module.scss';
import SvgWrapper from '../SvgWrapper/SvgWrapper';

import arrow from '@@/images/icons/arrow_small_orange.svg';

type Props = {
  text: string;
  maxLength: number;
  maxLengthMobile: number;
  isShowButton?: boolean;
  className?: string;
  isPrimary?: boolean;
};
export default function LimitedText({
  text,
  maxLength,
  maxLengthMobile,
  isShowButton = true,
  className,
}: Props) {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 435px)').matches);
  }, []);

  const checkedLength = isMobile ? maxLengthMobile : maxLength;
  const slicedText =
    text.length > checkedLength ? text.slice(0, checkedLength) + '...' : text;

  return (
    <div className={styles.limitedText}>
      <h2 className={classNames([styles.limitedText__text], className)}>
        {isShowMore ? text : slicedText}
      </h2>
      {isShowButton && text.length > slicedText.length && (
        <button
          className={classNames([styles.limitedText__button], {
            [styles.limitedText__buttonActive]: isShowMore,
          })}
          onClick={() => setIsShowMore((prev) => !prev)}
          type="button"
        >
          {isShowMore ? 'Приховати' : 'Показати більше'}
          <SvgWrapper src={arrow.src} />
        </button>
      )}
    </div>
  );
}
