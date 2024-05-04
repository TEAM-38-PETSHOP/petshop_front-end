import Link from 'next/link';
import styles from './toggleList.module.scss';
import { Product } from '@/types/Product';
import { Fragment } from 'react';
import classNames from 'classnames';

const descriptionList = [
  {
    id: 1,
    listName: 'Загальна характеристика',
    listKeys: {
      brand: 'Бренд',
      packaging: 'Пакування',
      groupProduct: 'Група продукції',
      countryProduct: 'Країна виробник',
    },
  },
  {
    id: 2,
    listName: 'Опис',
    listKeys: {
      description: 'Description',
      instructionWhyBuy: 'Why Buy',
    },
  },
  {
    id: 3,
    listName: 'Склад',
    listKeys: {
      composition: 'Composition',
      compositionAnalysis: ' Composition Analysis',
      compositionEnergyValue: 'Composition Energy Value',
      compositionExpiration: 'Composition Expiration',
    },
  },
  {
    id: 4,
    listName: 'Інструкції до використання',
    listKeys: {
      instruction: 'Instruction',
    },
  },
];

type Props = {
  product: Product;
  searchParams: { activeTab: string };
};

export default function ToggleList({ searchParams, product }: Props) {
  const activeTab = +(searchParams.activeTab || 1);
  const activeList = Object.entries(descriptionList[activeTab - 1].listKeys);
  const checkInfo = (keys: string[]) => {
    const productKeys = Object.keys(product);
    return keys.some(
      (key) => productKeys.includes(key) && !!product[key as keyof Product]
    );
  };

  return (
    <section className={styles.toggleList}>
      <ul className={styles.btnsList}>
        {descriptionList.map((item) => (
          <Fragment key={item.id}>
            {checkInfo(Object.keys(item.listKeys)) && (
              <li>
                <Link
                  className={classNames([styles.btnsList__btn], {
                    [styles.btnsList__btnActive]: item.id === activeTab,
                  })}
                  replace
                  scroll={false}
                  href={`?activeTab=${item.id}`}
                >
                  <span>0{item.id}</span> <span>{item.listName}</span>
                </Link>
              </li>
            )}
          </Fragment>
        ))}
      </ul>

      <hr className={styles.toggleList__hr} />

      <ul className={styles.infoList}>
        {activeList.map(([key, value]) => (
          <Fragment key={key}>
            {product[key as keyof Product] && (
              <li className={styles.infoList__item}>
                <p className={styles.infoList__itemName}>{value}</p>
                <p className={styles.infoList__itemValue}>
                  {product[key as keyof Product].toString()}
                </p>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
