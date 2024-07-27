import { User } from 'next-auth';

export interface IUser extends User {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  token: string;
}

export interface Role {
  role: string;
}
