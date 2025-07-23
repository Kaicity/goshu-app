import LoginDto from "@/models/dto/loginDto";
import { instance } from "../axiosClient";

export const login = async (login: LoginDto): Promise<any> => {
  try {
    console.log("🟡 [DEBUG] Sending login data:", login);
    const response = await instance.post("/auth/login", login);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || "System Errors");
  }
};
