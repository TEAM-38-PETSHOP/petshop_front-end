import { DeliveryStatus } from './enums/DeliveryStatus';

export interface IOrderResponse {
  id: number;
  userId: number;
  userTempId: number;
  status: DeliveryStatus;
  total: number;
  orderDate: string;
  address: AddressResponse;
  orderItems: OrderItemResponse[];
}

export interface AddressResponse {
  id: number;
  city: string;
  street: string;
  building: string;
  apartment: string;
  officeNovaPost: string;
}

export interface OrderItemResponse {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}
