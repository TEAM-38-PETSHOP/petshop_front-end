import Link from 'next/link';
import Image from 'next/image';
import styles from './HeaderForPages.module.scss';

import Arrow from '@/components/Arrow/Arrow';
import classNames from 'classnames';

type Props = {
  className?: string;
  centralBlock: {
    text?: string;
    img?: string;
  };
  additionalLink?: {
    text: string;
    href: string;
  };
};
export default function HeaderForPages({
  className,
  centralBlock = { text: '', img: '' },
  additionalLink = { text: '', href: '' },
}: Props) {
  return (
    <section className={classNames([styles.headerForPages], className)}>
      <Arrow
        isBack
        isWhite
        direction="left"
      />
      <div className={styles.headerForPages__centerContainer}>
        {centralBlock.img && (
          <Image
            className={styles.headerForPages__centerContainer__img}
            src={centralBlock.img}
            alt="dog"
          />
        )}
        <h2 className={styles.headerForPages__centerContainer__title}>
          {centralBlock.text}
        </h2>
      </div>
      <Link
        className={styles.headerForPages__additional}
        href={additionalLink.href}
      >
        {additionalLink.text}
      </Link>
    </section>
  );
}
