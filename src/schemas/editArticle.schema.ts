import { z } from "zod";

export const editArticleSchema = z.object({
  title: z.string().optional(),
  thumbnile: z.union([z.instanceof(File), z.string(), z.null()]).optional(),
  content: z.string().optional(),
  categories: z.string().optional(),
});

export type editArticleValues = z.infer<typeof editArticleSchema>;
