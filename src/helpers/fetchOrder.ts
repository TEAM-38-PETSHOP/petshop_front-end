import {
  IOrderWithoutAuth,
  IOrderWithoutAuthResponse,
} from '@/types/OrderWithoutAuth';
import { client } from '@/utils/fetchClient';

export const createOrder = (data: IOrderWithoutAuth) => {
  return client.post<IOrderWithoutAuthResponse>(
    `/api/orders/withoutAuth`,
    data
  );
};
