import { z } from 'zod';

export const createAccountSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z
    .string()
    .min(8, 'Mật khẩu ít nhất 8 ký tự')
    .regex(/^[A-Z][a-zA-Z0-9]*$/, 'Mật khẩu phải bắt đầu bằng chữ hoa và không chứa ký tự đặc biệt'),
  role: z.string({ message: 'Vui lòng chọn vai trò' }),
  status: z.string().optional(),
});

export const updateAccountSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().optional().or(z.literal('')), // Cho phép chuỗi rỗng hoặc undefined
  role: z.string(),
  status: z.string().optional(),
});

export type createAccountFormData = z.infer<typeof createAccountSchema>;
export type updateAccountFormData = z.infer<typeof updateAccountSchema>;
