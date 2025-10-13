import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  userName: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string().max(255, "Bio must be less than 255 characters").optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  medium: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterx: z.string().url("Invalid URL").optional().or(z.literal("")),
  photo: z.file().optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
