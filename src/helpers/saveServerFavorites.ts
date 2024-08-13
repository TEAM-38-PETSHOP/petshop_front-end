import { checkWindow } from './checkWindow';
import { AppDispatch } from '@/redux/store';
import {
  FavoriteState,
  setFavoriteProducts,
} from '@/redux/features/favoriteSlice';
import { getFavoriteItems, sendFavoriteItems } from './fetchFavorites';

export const saveServerFavorites = async (
  accessToken: string,
  favoriteProducts: FavoriteState['favoriteProducts'],
  dispatch: AppDispatch
) => {
  favoriteProducts.forEach(async (item) => {
    await sendFavoriteItems(item.product.productId, accessToken);
  });

  const serverFavoriteItems = await getFavoriteItems(accessToken);

  const newFavorites = serverFavoriteItems.wishItems.map((item) => {
    return {
      product: item.product,
      wishItemId: item.wishItemId,
    };
  });

  dispatch(setFavoriteProducts(newFavorites));
  checkWindow() &&
    localStorage.setItem('favorite', JSON.stringify(newFavorites));
};
