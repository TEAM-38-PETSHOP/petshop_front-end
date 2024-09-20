import { DeliveryStatus } from './enums/DeliveryStatus';
import { Product } from './Product';

export interface IOrderResponse {
  id: number;
  userId: number;
  userTempId: number;
  status: DeliveryStatus;
  total: number;
  orderDate: string;
  phone: string;
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
  comment: string;
}

export interface OrderItemResponse {
  id: number;
  productDto: Product;
  quantity: number;
  price: number;
}
