import { z } from "zod";

export const reassonsArtcleSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  message: z
    .string()
    .min(1, "Reasson message is required")
    .min(10, "Reasson message must be at least 10 characters")
    .max(500, "Reasson message must be less than 500 characters"),
  reviewer: z.string().optional(),
});

export type reassonsArtcleValues = z.infer<typeof reassonsArtcleSchema>;
