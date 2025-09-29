import z from "zod";

export const updateProfile = z.object({
    username: z.string().min(6, "Username must be at least 6 character!"),
    photo: z.any().optional().transform((arg) => {
        if(arg instanceof FileList && arg.length > 0) {
            return arg[0];
        }
        return undefined;
    }).pipe(z.instanceof(File).optional()),
});

export type UpdateProfileForm = z.infer<typeof updateProfile>;

