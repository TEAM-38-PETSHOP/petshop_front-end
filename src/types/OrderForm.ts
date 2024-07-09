export interface IOrderForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  deliveryPoint: string;
  paymentMethod: string;
  comment?: string;
}