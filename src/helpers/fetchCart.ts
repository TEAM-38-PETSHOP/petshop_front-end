import { client } from '../utils/fetchClient';
import { ICartItemForRequest, ICartItemResponse } from '@/types/cartTypes';

export const getCartItems = (token: string) => {
  return client.get<ICartItemResponse>(`/api/carts`, token);
};

export const sendCartItems = (
  cartItems: ICartItemForRequest[],
  token: string
) => {
  return client.post(
    `/api/carts`,
    {
      cartItemRequestDtos: cartItems,
    },
    token
  );
};
