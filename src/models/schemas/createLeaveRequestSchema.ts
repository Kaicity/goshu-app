import { z } from 'zod';

export const createLeaveRequestSchema = z.object({
  employeeId: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  reason: z.string().optional(),
  note: z.string().optional(),
  status: z.string().optional(),
});

export type createLeaveRequestFormData = z.infer<typeof createLeaveRequestSchema>;
