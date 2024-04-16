import styles from './favorites.module.scss';
import HeaderForPages from '@/components/HeaderForPages/HeaderForPages';
import FavoritesFilter from '@/components/ForFavorites/FavoritesFilter/FavoritesFilter';
import FavoriteProducts from '@/components/ForFavorites/FavoriteProducts/FavoriteProducts';
import { getAllCategories } from '@/helpers/fetchCategories';
import { Suspense } from 'react';
import Loader from '@/components/Loader/Loader';

export default async function Favorites() {
  const categories = await getAllCategories();

  return (
    <>
      <HeaderForPages centralBlock={{ text: 'Список бажань' }} />

      <section className={styles.favorites}>
        <Suspense>
          <FavoritesFilter categories={categories} />
          <FavoriteProducts />
        </Suspense>
      </section>
    </>
  );
}
