import { User } from "next-auth";

export interface IUser extends User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  token: string;
  tokenExpires: number;
}

export interface Role {
  role: string;
}
