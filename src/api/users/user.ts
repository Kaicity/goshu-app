import type LoginDto from "@/models/dto/loginDto";
import { instance } from "../axiosClient";
import UserAccountDto from "@/models/dto/userAccountDto";

export const forgotPassword = async (email: string): Promise<any> => {
  try {
    const response = await instance.post("/users/forgotPassword", { email });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || "System Errors");
  }
};

export const changePassword = async (account: LoginDto): Promise<any> => {
  try {
    const response = await instance.post("/users/changePassword", account);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || "System Errors");
  }
};

export const getUsers = async (): Promise<UserAccountDto[]> => {
  try {
    const response = await instance.get("/users/getAll");
    console.log("🟡 [DEBUG] Fetching user data", response);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || "System Errors");
  }
};

export const createAccountUser = async (user: UserAccountDto): Promise<any> => {
  try {
    const response = await instance.post("/users/createAccount", user);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || "System Errors");
  }
};

export const deleteAccountUser = async (id: string): Promise<boolean> => {
  try {
    const response = await instance.delete(`/users/deleteAccount/${encodeURIComponent(id)}`);
    if (response.data?.statusCode === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};