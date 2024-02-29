import { TypeOfService } from '@/types/TypeOfService';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<any>(`/api/products`);
};

export const getAllTypeOfPetServices = () => {
  return client.get<TypeOfService[]>(`/api/grooms/typeOfServices`);
};
