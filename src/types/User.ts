export interface IUser {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}

export interface Role {
  role: string;
}
