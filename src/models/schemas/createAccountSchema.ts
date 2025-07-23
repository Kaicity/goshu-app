import { z } from "zod";

export const createAccountSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z
    .string()
    .min(8, "Mật khẩu ít nhất 8 ký tự")
    .regex(
      /^[A-Z][a-zA-Z0-9]*$/,
      "Mật khẩu phải bắt đầu bằng chữ hoa và không chứa ký tự đặc biệt"
    ),
  role: z.string(),
  status: z.string(),
});

export type createAccountFormData = z.infer<typeof createAccountSchema>;
