import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Vui lòng điền Email"),
});

export type forgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;
