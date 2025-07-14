import LoginDto from "@/models/dto/loginDto";
import { instance } from "../clientApi";

export const login = async (login: LoginDto): Promise<string> => {
  try {
    const response = await instance.post("/users/login", login);

    if (response.data?.statusCode === 200) {
      return response.data?.data?.accessToken;
    } else {
      throw new Error("Failed to request login account so not success");
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};
