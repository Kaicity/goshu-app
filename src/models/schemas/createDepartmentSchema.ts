import { z } from 'zod';

export const createDepartmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Vui lòng điền thông tin tên phòng ban.').max(100, 'Tên phòng ban không được vượt quá 100 ký tự.'),
  description: z.string().min(2, 'Vui lòng điền thông tin mô tả.').max(500, 'Mô tả không được vượt quá 500 ký tự.'),
  updatedAt: z.date().optional(),
});

export const updateDepartmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().or(z.literal('')),
  description: z.string().or(z.literal('')),
  updatedAt: z.date().optional(),
});

export type CreateDepartmentFormData = z.infer<typeof createDepartmentSchema>;
export type UpdateDepartmentFormData = z.infer<typeof updateDepartmentSchema>;
