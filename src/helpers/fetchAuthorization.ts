import { IUser } from '@/types/User';
import { client } from '../utils/fetchClient';

type token = {
  token: string;
};

export const login = (email: string, password: string) => {
  return client.post<token>('/api/auth/login', {
    email,
    password,
  });
};

export const registerUser = (
  email: string,
  phone: string,
  password: string,
  repeatPassword: string,
  firstName: string,
  lastName: string
) => {
  return client.post<IUser>('/api/auth/registration', {
    email,
    phone,
    password,
    repeatPassword,
    firstName,
    lastName,
  });
};

export const getUser = (token: string) => {
  return client.get<IUser>('/api/users/info', token);
};

export const checkEmail = (email: string) => {
  return client.post<string>(
    '/api/auth/forgot-password',
    {
      email,
    },
    null,
    true
  );
};
