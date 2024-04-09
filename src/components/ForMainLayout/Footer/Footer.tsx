import Image from 'next/image';
import styles from './footer.module.scss';

import logo2 from '@@/images/icons/logo2.svg';
import Link from 'next/link';
export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <Image
          className={styles.footerContent__logo}
          src={logo2}
          alt="logo"
        />
        <div className={styles.footerContent__info}>
          <div>
            <h3 className={styles.footerContent__infoTitle}>Мережа</h3>
            <ul className={styles.footerContent__infoList}>
              <li>
                <Link
                  href="https://www.instagram.com/onegroom.ua?igsh=MWNra2Qwa3N1eGRlNA=="
                  target="_blank"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  target="_blank"
                >
                  Telegram
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={styles.footerContent__infoTitle}>Контакти</h3>
            <ul className={styles.footerContent__infoList}>
              <li>
                <Link
                  href="https://maps.app.goo.gl/1gwjf3axpxft4zR18"
                  target="_blank"
                >
                  Київський шлях
                  <br />
                  127б/6, Boryspil
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+380972373086"
                  className={styles.footerContent__infoFirstPhone}
                >
                  +380 97 237 30 86
                </Link>
                <br />
                <Link href="tel:++380972715239">+380 97 271 52 39</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={styles.footerContent__infoTitle}>Меню</h3>
            <ul className={styles.footerContent__infoList}>
              <li>
                <Link href="/">Головна</Link>
              </li>
              <li>
                <Link href="/grooming">Грумінг</Link>
              </li>
              <li>
                <Link href="/catalog">Магазин</Link>
              </li>
              <li>
                <Link href="/contacts">Контакти</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className={styles.footer__copyright}>
        ©2024 onegroom, Inc. All rights reserved.
      </p>
    </div>
  );
}
