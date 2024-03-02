import Image from 'next/image';
import styles from './roadToUs.module.scss';

// import paw from '@@/images/drawn/paw.svg?url';
// import paw from './Group 90.svg?url';
export default function RoadToUs() {
  return (
    <div className={styles.roadToUs}>
      {/* <Image
        className={styles.roadToUs__img}
        loading="lazy"
        src={paw}
        alt="paw"
      /> */}
      <h3 className={styles.roadToUs__title}>
        Надійний догляд за вашими дорогоцінними лапками тут
      </h3>
    </div>
  );
}
