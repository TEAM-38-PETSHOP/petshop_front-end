import { client } from '../utils/fetchClient';
import { ICartItemForRequest, ICartItemResponse } from '@/types/cartTypes';

export const getCartItems = (token: string) => {
  return client.get<ICartItemResponse>(`/api/carts`, token);
};

export const sendCartItems = (
  cartItems: ICartItemForRequest[],
  token: string
) => {
  return client.post<ICartItemResponse>(
    `/api/carts`,
    {
      cartItemRequestDtos: cartItems,
    },
    token
  );
};

export const deleteCartItem = (cartItemId: number, token: string) => {
  return client.delete(`/api/carts/cart-items/${cartItemId}`, token);
};

export const updateCartItem = (
  cartItemId: number,
  productId: number,
  quantity: number,
  token: string
) => {
  return client.patch(
    `/api/carts/cart-items/${cartItemId}`,
    {
      productId,
      quantity,
    },
    token
  );
};
