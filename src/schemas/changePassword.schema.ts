import { z } from "zod";

export const changePasswordSchema = z.object({
    old_password: z.string().min(6, "Password must be at least 6 characters"),
    new_password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_new_password: z.string().min(6, "Password must be at least 6 character"),
}).refine((data) => data.new_password === data.confirm_new_password, {
    message: "Old and new Password do not match",
    path: ["confirm_new_password"]
});

export type changePasswordFormValues = z.infer<typeof changePasswordSchema>;
