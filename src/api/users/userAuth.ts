import LoginDto from "@/models/dto/loginDto";
import { instance } from "../clientApi";

export const login = async (login: LoginDto): Promise<string> => {
  try {
    const response = await instance.post("/auth/login", login);

    console.log("Login response:", response?.status);

    if (response?.status === 200) {
      return response.data?.data;
    } else {
      throw new Error("Failed to request login account so not success");
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};
