import { z } from 'zod';

export const createEmployeeSchema = z.object({
  fullname: z
    .string()
    .min(2, 'Vui lòng nhập họ và tên.')
    .max(100, 'Họ và tên không được vượt quá 100 ký tự.')
    .nullable()
    .optional(),
  username: z
    .string()
    .min(2, 'Vui lòng nhập tên đăng nhập.')
    .max(50, 'Tên đăng nhập không được vượt quá 50 ký tự.')
    .nullable()
    .optional(),
  githubId: z.string().url('Liên kết GitHub không hợp lệ.').nullable().optional(),
  slackId: z.string().nullable().optional(),
  microsoftTeamId: z.string().nullable().optional(),
  address: z.string().max(200, 'Địa chỉ không được vượt quá 200 ký tự.').nullable().optional(),
  phone: z.string().max(15, 'Số điện thoại không hợp lệ.').nullable().optional(),
  birthday: z.date().nullable().optional(),
  gender: z.enum(['male', 'female', 'other']).nullable().optional(),
  designation: z.string().max(100, 'Chức danh không được vượt quá 100 ký tự.').nullable().optional(),
  type: z.string().nullable().optional(),
  joinDate: z.date().nullable().optional(),
  workingDate: z.date().nullable().optional(),
  avatarUrl: z.string().url('URL ảnh không hợp lệ.').nullable().optional(),
  document: z.string().nullable().optional(),
  departmentId: z.string().nullable().optional(),
});

export type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;
