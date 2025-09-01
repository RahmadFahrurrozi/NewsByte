import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  thumbnile: z.file({ message: "Thumbnail is required" }),
  content: z.string().min(1, "Content is required"),
  categories: z.string().min(1, "Categories are required"),
});

export type createArticleValues = z.infer<typeof createArticleSchema>;
