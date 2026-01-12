import { z } from 'zod';

export const updatePayrollSchema = z.object({
  overtime: z.number().optional(),
  deductions: z.number().optional(),
  basicSalary: z.number().optional(),
  allowance: z.number().optional(),
});

export type UpdatePayrollFormData = z.infer<typeof updatePayrollSchema>;
