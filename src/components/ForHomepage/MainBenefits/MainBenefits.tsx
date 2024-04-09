'use client';
import Image from 'next/image';
import classNames from 'classnames';
import SvgWrapper from '@/components/SvgWrapper/SvgWrapper';
import styles from './mainBenefits.module.scss';

import dog from '@@/images/drawn/dog1.svg';
import triangle from '@@/images/icons/triangle_for_message.svg';
import { useInView } from 'react-intersection-observer';
export default function MainBenefits() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      className={styles.mainBenefits}
      ref={ref}
    >
      <div className={styles.mainBenefits__messages}>
        <h3
          className={classNames([styles.mainBenefits__message], {
            [styles.mainBenefits__messageActive]: inView,
          })}
        >
          Пухнастики до 9 місяців мають -20% на усі послуги в Грумінг Спа
          <SvgWrapper
            src={triangle.src}
            className={styles.mainBenefits__messageTriangle}
          />
        </h3>
        <h3
          className={classNames([styles.mainBenefits__message], {
            [styles.mainBenefits__messageActive]: inView,
          })}
        >
          Перша послуга в Грумінг Спа = -10%
          <SvgWrapper
            src={triangle.src}
            className={classNames(
              [styles.mainBenefits__messageTriangle],
              [styles.mainBenefits__messageTriangle_second]
            )}
          />
        </h3>
        <h3
          className={classNames([styles.mainBenefits__message], {
            [styles.mainBenefits__messageActive]: inView,
          })}
        >
          15% знижки на всі товари в день народження* твого улюбленця
          <br />
          <small>*при наявності паспорта тваринки</small>
          <SvgWrapper
            src={triangle.src}
            className={classNames(
              [styles.mainBenefits__messageTriangle],
              [styles.mainBenefits__messageTriangle_last]
            )}
          />
        </h3>
      </div>
      <Image
        className={classNames([styles.mainBenefits__img], {
          [styles.mainBenefits__imgActive]: inView,
        })}
        src={dog}
        alt="dog"
      />
    </section>
  );
}
