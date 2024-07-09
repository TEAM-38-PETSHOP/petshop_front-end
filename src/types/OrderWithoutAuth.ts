export interface IOrderWithoutAuth {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: Address;
  cartItems: CartItem[];
  comment?: string;
}

export interface Address {
  city: string;
  street?: string;
  building?: string;
  apartment?: string;
  officeNovaPost: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface IOrderWithoutAuthResponse {
  id: number;
  userId: number;
  userTempId: number;
  status: string;
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
