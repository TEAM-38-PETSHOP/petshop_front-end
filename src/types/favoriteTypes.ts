import { Product } from './Product';

export interface IFavoriteItemResponse {
  id: number;
  userId: number;
  wishItems: FavoriteItem[];
}

export interface FavoriteItem {
  wishItemId: number;
  product: Product;
}
