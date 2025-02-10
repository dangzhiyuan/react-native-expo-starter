import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "用户名至少3个字符")
    .max(20, "用户名最多20个字符"),
  password: z.string().min(6, "密码至少6个字符").max(20, "密码最多20个字符"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
