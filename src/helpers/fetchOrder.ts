import { IOrderResponse } from '@/types/OrderResponse';
import { IOrderWithAuth } from '@/types/OrderWithAuth';
import { IOrderWithoutAuth } from '@/types/OrderWithoutAuth';
import { client } from '@/utils/fetchClient';

export const createOrderWithoutAuth = (data: IOrderWithoutAuth) => {
  return client.post<IOrderResponse>(`/api/orders/withoutAuth`, data);
};

export const createOrderWithAuth = (data: IOrderWithAuth, token: string) => {
  return client.post<IOrderResponse>(`/api/orders`, data, token);
};
