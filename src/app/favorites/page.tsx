import styles from './favorites.module.scss';
import HeaderForPages from '@/components/HeaderForPages/HeaderForPages';
import FavoritesFilter from '@/components/ForFavorites/FavoritesFilter/FavoritesFilter';
import FavoriteProducts from '@/components/ForFavorites/FavoriteProducts/FavoriteProducts';
import { getAllCategories } from '@/helpers/fetchCategories';

export default async function Favorites() {
  const categories = await getAllCategories();

  return (
    <>
      <HeaderForPages centralBlock={{ text: 'Список бажань' }} />

      <section className={styles.favorites}>
        <FavoritesFilter categories={categories} />
        <FavoriteProducts />
      </section>
    </>
  );
}
