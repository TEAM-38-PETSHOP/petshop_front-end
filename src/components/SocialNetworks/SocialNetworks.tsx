import Buttons from '../Buttons/Buttons';
import styles from './socialNetworks.module.scss';
import Image from 'next/image';
import classNames from 'classnames';

import phone from '@@/images/icons/call.svg';
import inst from '@@/images/icons/inst.svg';
import tg from '@@/images/icons/tg.svg';
import cat from '@@/images/drawn/social-cat1.svg?url';
import dog1 from '@@/images/drawn/social-dog1.svg?url';
import dog2 from '@@/images/drawn/social-dog2.svg?url';

export default function SocialNetworks() {
  return (
    <section className={styles.socialNetworks}>
      <div className={styles.socialNetworks__content}>
        <h3 className={styles.socialNetworks__title}>
          Також можемо познайомитись тут
        </h3>
        <div className={styles.socialNetworks__btns}>
          <Buttons
            firstBtn={{
              target: '_blank',
              btnLink: 'https://tg',
              btnText: 'Telegram',
              btnIcon: tg,
            }}
          />
          <Buttons
            firstBtn={{
              target: '_blank',
              btnLink: 'https://www.instagram.com/onegroom.ua/',
              btnText: 'Instagram',
              btnIcon: inst,
              className: styles.socialNetworks__inst,
            }}
            secondBtn={{
              target: '_blank',
              btnLink: 'tel:+380972373086',
              btnText: 'Зателефонувати',
              btnIcon: phone,
              className: styles.socialNetworks__phone,
            }}
          />
        </div>
      </div>

      <Image
        src={cat}
        alt="cat"
        className={classNames(
          [styles.socialNetworks__svg],
          [styles.socialNetworks__cat]
        )}
      />
      <Image
        src={dog1}
        alt="dog"
        className={classNames(
          [styles.socialNetworks__svg],
          [styles.socialNetworks__dog1]
        )}
      />
      <Image
        src={dog2}
        alt="dog"
        className={classNames(
          [styles.socialNetworks__svg],
          [styles.socialNetworks__dog2]
        )}
      />
    </section>
  );
}
