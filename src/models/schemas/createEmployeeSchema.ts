import { TypeWork } from '@/enums/typeWorkEnum';
import { z } from 'zod';

export const createEmployeeSchema = z.object({
  firstname: z.string().max(100, 'Họ không được vượt quá 50 ký tự.').optional(),
  lastname: z.string().max(100, 'Tên không được vượt quá 50 ký tự.').optional(),
  username: z.string().max(50, 'Tên đăng nhập không được vượt quá 50 ký tự.').optional(),
  githubId: z.string().optional(),
  slackId: z.string().optional(),
  microsoftTeamId: z.string().optional(),
  address: z.string().max(200, 'Địa chỉ không được vượt quá 200 ký tự.').optional(),
  phone: z.string().max(15, 'Số điện thoại không hợp lệ.').optional(),
  gender: z.string().optional(),
  designation: z.string().max(100, 'Chức danh không được vượt quá 100 ký tự.').optional(),
  type: z.nativeEnum(TypeWork).optional(),
  birthday: z.coerce.date().optional(),
  joinDate: z.coerce.date().optional(),
  workingDate: z.coerce.date().optional(),
  avatarUrl: z.string().optional(),
  document: z.array(z.string()).optional(),
  departmentId: z.string().optional(),
  country: z.string().optional(),
  marital: z.string().optional(),
  internalEmail: z.string().optional(),
  identityCard: z.string().optional(),
});

export type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;
