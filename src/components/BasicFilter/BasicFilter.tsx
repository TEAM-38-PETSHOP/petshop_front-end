'use client';
import { useSearchParams } from 'next/navigation';
import styles from './basicFilter.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import { createUrl } from '@/helpers/createUrlString';

type Props = {
  filterList: {
    id: number | string;
    name: string;
    colorIndicator?: 'green' | 'blue' | 'red';
  }[];
  searchParamsName: string;
};

export default function BasicFilter({ filterList, searchParamsName }: Props) {
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get(searchParamsName) || 'all';

  return (
    <ul className={styles.basicFilter}>
      <li>
        <Link
          scroll={false}
          href={{
            pathname: '',
            query: createUrl(
              [{ name: searchParamsName, value: 'all' }],
              searchParams
            ),
          }}
          className={classNames([styles.basicFilter__item], {
            [styles.basicFilter__active]: activeFilter === 'all',
          })}
        >
          Всі
        </Link>
      </li>

      {filterList.map((item) => (
        <li key={item.id}>
          <Link
            scroll={false}
            href={{
              pathname: '',
              query: createUrl(
                [{ name: searchParamsName, value: item.id.toString() }],
                searchParams
              ),
            }}
            className={classNames([styles.basicFilter__item], {
              [styles.basicFilter__active]: activeFilter === item.id.toString(),
            })}
          >
            <span
              className={classNames({
                [styles.basicFilter__indicator]: item.colorIndicator,
                [styles[item.colorIndicator as string]]: item.colorIndicator,
                [`styles.basicFilter__indicator-${item.colorIndicator}`]:
                  item.colorIndicator,
              })}
            ></span>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
