import { IFavoriteItemResponse } from '@/types/favoriteTypes';
import { client } from '../utils/fetchClient';

export const getFavoriteItems = (token: string) => {
  return client.get<IFavoriteItemResponse>(`/api/profile/wishlists`, token);
};

export const sendFavoriteItems = (productId: number, token: string) => {
  return client.post<IFavoriteItemResponse>(
    `/api/profile/wishlists`,
    {
      productId,
    },
    token
  );
};

export const deleteFavoriteItem = (wishItemId: number, token: string) => {
  return client.delete(
    `/api/profile/wishlists/wish-items/${wishItemId}`,
    token
  );
};
