import { IUser } from './User';

export interface CustomSession extends Record<string, unknown> {
  accessToken: string;
  user: IUser;
  expires: string;
}
