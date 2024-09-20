import { IUser } from "@/types/User";
import { client } from "../utils/fetchClient";
import { ContactInfoForm } from "@/types";

type token = {
  token: string;
};

export const login = (email: string, password: string) => {
  return client.post<token>("/api/auth/login", {
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
  return client.post<IUser>("/api/auth/registration", {
    email,
    phone,
    password,
    repeatPassword,
    firstName,
    lastName,
  });
};

export const getUser = (token: string) => {
  return client.get<IUser>("/api/users/info", token);
};

export const checkEmail = (email: string) => {
  return client.post<string>(
    "/api/auth/forgot-password",
    {
      email,
    },
    null,
    true
  );
};

export const resetPassword = (code: string, password: string) => {
  return client.post<string>(
    "/api/auth/reset-password",
    {
      code,
      password,
    },
    null,
    true
  );
};

export const deleteAccount = (userId: number, token: string) => {
  return client.delete(`/api/users/${userId}`, token, true);
};

export const updateUserInfo = (data: ContactInfoForm, token: string) => {
  return client.post(`/api/users/profile-update`, data, token);
};

export const sendFeedback = (data: FormData, token: string) => {
  return client.post("/api/users/feedbacks", data, token, true, true);
};
