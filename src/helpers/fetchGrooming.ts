import { TypeOfService } from '@/types/TypeOfService';
import { client } from '../utils/fetchClient';
import { Service } from '@/types/Service';

export const getAllTypeOfPetServices = () => {
  // Отримуємо усі типи послуг breeds (174)
  return client.get<TypeOfService[]>(`/api/grooms/typeOfServices`);
};

export const getTypeOfPetService = (serviceId: number) => {
  // Отримуємо конкретний breed для конкретного типу послуг
  // Тобто породи для конкретного типу послуг
  return client.get<TypeOfService>(`/api/grooms/typeOfServices/${serviceId}`);
};

export const getTypeOfServiceById = (id: number) => {
  // Отримуємо конкретний breed за його id
  return client.get<TypeOfService>(`/api/grooms/typeOfService/${id}`);
};

export const getAllServices = () => {
  // Отримуємо усі категорії послуг (і для котів і для собак)
  // Разом їх 11
  return client.get<Service[]>(`/api/grooms/services`);
};

export const getServicesById = (animalId: number) => {
  // Отримуємо усі категорії для конкретної тварини
  return client.get<Service[]>(`/api/grooms/services/${animalId}`);
};

export const getPetServiceById = (id: number) => {
  // Отримуємо конкретну категорію через id
  return client.get<Service>(`/api/grooms/service/${id}`);
};
