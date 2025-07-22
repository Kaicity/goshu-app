import LoginDto from "@/models/dto/loginDto";
import { instance } from "../axiosClient";
import UserAccountDto from "@/models/dto/userAccountDto";

export const login = async (login: LoginDto): Promise<any> => {
  try {
    console.log("🟡 [DEBUG] Sending login data:", login);
    const response = await instance.post("/auth/login", login);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || "Đăng nhập thất bại");
  }
};

export const getUsers = async (): Promise<UserAccountDto[]> => {
  try {
    const response = await instance.get("/users/getAll");
    console.log("🟡 [DEBUG] Fetching user data", response);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    throw new Error("Không thể lấy danh sách người dùng");
  }
};

export const createAccountUser = async (user: UserAccountDto): Promise<any> => {
  try {
  const response = await instance.post("/users/createAccount", user);
  } catch(error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage || "Không thể tạo tài khoản người dùng");
}
};


