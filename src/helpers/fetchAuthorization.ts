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

export const getUser = (token: string) => {
  return client.get<IUser>('/api/users/info', token);
};
