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
