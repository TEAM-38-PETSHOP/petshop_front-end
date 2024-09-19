import styles from './favorites.module.scss';
import HeaderForPages from '@/components/HeaderForPages/HeaderForPages';
import BasicFilter from '@/components/BasicFilter/BasicFilter';
import FavoriteProducts from '@/components/ForFavorites/FavoriteProducts/FavoriteProducts';
import { getAllCategories } from '@/helpers/fetchCategories';
import { Suspense } from 'react';

export default async function Favorites() {
  const categories = await getAllCategories();

  return (
    <>
      <HeaderForPages centralBlock={{ text: 'Список бажань' }} />

      <section className={styles.favorites}>
        <Suspense>
          <BasicFilter
            filterList={categories.map((item) => ({
              id: item.categoryId,
              name: item.name,
            }))}
            searchParamsName="category"
          />
          <FavoriteProducts />
        </Suspense>
      </section>
    </>
  );
}
