import { z } from "zod";

export const createNewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  categories: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author is required"),
  thumbnile: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File maksimal 5MB",
    })
    .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
      message: "Hanya file PNG atau JPEG yang diperbolehkan",
    }),
});

export type CreateNewsSchema = z.infer<typeof createNewsSchema>;
