import { z } from 'zod';

export const createLeaveRequestSchema = z.object({
  employeeId: z.string().optional(),
  startDate: z.string({
    message: 'Ngày bắt đầu là bắt buộc',
  }),
  endDate: z.string({
    message: 'Ngày kết thúc là bắt buộc',
  }),
  reason: z.string({ message: 'Lý do nghỉ phép là bắt buộc' }).min(5, 'Lý do nghỉ quá ngắn, phải ít nhất 5 kí tự'),
  note: z.string().max(500, 'Ghi chú không được vượt quá 500 ký tự').optional(),
  status: z.string().optional(),
});

export type createLeaveRequestFormData = z.infer<typeof createLeaveRequestSchema>;
