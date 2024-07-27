import { Product } from './Product';

export interface ICartItemForRequest {
  productId: number;
  quantity: number;
}

export interface ICartItemResponse {
  id: number;
  userId: number;
  cartItems: CartItem[];
}

export interface CartItem {
  cartItemId: number;
  productDto: Product;
  quantity: number;
}
