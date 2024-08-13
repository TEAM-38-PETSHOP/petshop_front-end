import { IUser } from './User';

export interface CustomJWT extends Record<string, unknown> {
  accessToken: string;
  user: IUser;
  tokenExpires: number;
}
