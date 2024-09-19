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

export const getOrders = (token: string) => {
  return client.get<IOrderResponse[]>(`/api/orders`, token);
};

export const deleteOrder = (orderId: number, token: string) => {
  return client.delete<string>(`/api/orders/${orderId}`, token, true);
};

export const cancelOrder = (orderId: number, token: string) => {
  return client.put<IOrderResponse>(
    `/api/orders/update-cancel/${orderId}`,
    null,
    token
  );
};

export const renewOrder = (orderId: number, token: string) => {
  return client.put<IOrderResponse>(
    `/api/orders/renew/${orderId}`,
    null,
    token
  );
};
