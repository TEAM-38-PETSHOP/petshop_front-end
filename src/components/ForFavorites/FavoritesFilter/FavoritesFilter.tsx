'use client';
import { useSearchParams } from 'next/navigation';
import styles from './favoritesFilter.module.scss';
import classNames from 'classnames';
import Link from 'next/link';

import { Category } from '@/types/Product';

type Props = {
  categories: Category[];
};

export default function FavoritesFilter({ categories }: Props) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';

  return (
    <ul className={styles.favoritesFilter}>
      <li>
        <Link
          scroll={false}
          href="?category=all"
          className={classNames([styles.favoritesFilter__item], {
            [styles.favoritesFilter__active]: category === 'all',
          })}
        >
          Всі
        </Link>
      </li>

      {categories.map((item) => (
        <li key={item.categoryId}>
          <Link
            scroll={false}
            href={`?category=${item.categoryId}`}
            className={classNames([styles.favoritesFilter__item], {
              [styles.favoritesFilter__active]:
                category === item.categoryId.toString(),
            })}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
