'use client';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import styles from './favoriteProducts.module.scss';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useSearchParams } from 'next/navigation';
import { filterProductsByCategoryId } from '@/helpers/filters';
import { Product } from '@/types/Product';
import classNames from 'classnames';

export default function FavoriteProducts() {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const products = useAppSelector((state) => state.favorite.favoriteProducts);
  const category = useSearchParams().get('category') || 'all';
  const filteredProducts = filterProductsByCategoryId(
    favoriteProducts,
    category
  );

  useEffect(() => {
    setFavoriteProducts(products.map((product) => product.product));
  }, [products]);

  const isOneProductStyle = filteredProducts.length === 1;
  const isFewProductStyle = filteredProducts.length < 5;

  return (
    <>
      {!!filteredProducts.length ? (
        <div
          className={classNames([styles.favoriteProducts], {
            [styles.favoriteProducts__FewItem]: isFewProductStyle,
            [styles.favoriteProducts__OneItem]: isOneProductStyle,
          })}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.productId}
              className={classNames([styles.favoriteProducts__item], {
                [styles.favoriteProducts__itemOne]: isOneProductStyle,
              })}
              product={product}
            />
          ))}
        </div>
      ) : (
        <h3 className={styles.favoriteProducts__empty}>
          {category === 'all'
            ? 'У вас поки немає обраних товарів'
            : 'У вас поки немає обраних товарів у цій категорії'}
        </h3>
      )}
    </>
  );
}
