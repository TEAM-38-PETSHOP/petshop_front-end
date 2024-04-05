import Image from 'next/image';
import SvgWrapper from '@/components/SvgWrapper/SvgWrapper';
import styles from './mainBenefits.module.scss';

import dog from '@@/images/drawn/dog1.svg';
import triangle from '@@/images/icons/triangle_for_message.svg';
export default function MainBenefits() {
  return (
    <section className={styles.mainBenefits}>
      <div className={styles.mainBenefits__messages}>
        <h3 className={styles.mainBenefits__message}>
          Пухнастики до 9 місяців мають -20% на усі послуги в Грумінг Спа
          <SvgWrapper
            src={triangle.src}
            className={styles.mainBenefits__messageTriangle}
          />
        </h3>
        <h3 className={styles.mainBenefits__message}>
          Перша послуга в Грумінг Спа = -10%
          <SvgWrapper
            src={triangle.src}
            className={styles.mainBenefits__messageTriangle}
          />
        </h3>
        <h3 className={styles.mainBenefits__message}>
          15% знижки на всі товари в день народження* твого улюбленця
          <br />
          <small>*при наявності паспорта тваринки</small>
          <SvgWrapper
            src={triangle.src}
            className={styles.mainBenefits__messageTriangle}
          />
        </h3>
      </div>
      <Image
        className={styles.mainBenefits__img}
        src={dog}
        alt="dog"
      />
    </section>
  );
}
