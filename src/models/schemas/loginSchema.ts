import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Vui lòng điền Email"),
  password: z.string().min(1, "Vui lòng điền mật khẩu"),
});

export type loginFormData = z.infer<typeof loginFormSchema>;
