import type LoginDto from "@/models/dto/loginDto";
import { instance } from "../axiosClient";
import UserAccountDto from "@/models/dto/userAccountDto";

export const forgotPassword = async (email: string): Promise<any> => {
  try {
    const response = await instance.post("/users/forgotPassword", { email });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || "Mất kết nối đến hệ thống máy chủ");
  }
};

export const changePassword = async (account: LoginDto): Promise<any> => {
  try {
    const response = await instance.post("/users/changePassword", account);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || "Mất kết nối đến hệ thống máy chủ");
  }
};

export const getUsers = async (): Promise<UserAccountDto[]> => {
  try {
    const response = await instance.get("/users/getAll");
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw Error(errorMessage || "Mất kết nối đến hệ thống máy chủ");
  }
};

export const createAccountUser = async (user: UserAccountDto): Promise<any> => {
  try {
    const response = await instance.post("/users/createAccount", user);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || "Mất kết nối đến hệ thống máy chủ");
  }
};
