import Image from 'next/image';
import styles from './leftBar.module.scss';

import cat from '@@/images/drawn/social-cat1.svg';
import dog1 from '@@/images/drawn/social-dog1.svg';
import dog2 from '@@/images/drawn/social-dog2.svg';
import classNames from 'classnames';
export default function LeftBar() {
  return (
    <div className={styles.leftBar}>
      <h4 className={styles.leftBar__title}>Раді вас бачити!</h4>
      <Image
        className={classNames(styles.leftBar__image, styles.leftBar__imageCat)}
        src={cat}
        alt="Cat"
        width={100}
        height={100}
      />
      <Image
        className={classNames(styles.leftBar__image, styles.leftBar__imageDog)}
        src={dog1}
        alt="Dog"
        width={100}
        height={100}
      />
      <Image
        className={classNames(styles.leftBar__image, styles.leftBar__imageDog2)}
        src={dog2}
        alt="Dog"
        width={100}
        height={100}
      />
    </div>
  );
}
