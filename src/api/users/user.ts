import type LoginDto from "@/models/dto/loginDto";
import { instance } from "../axiosClient";

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
