import { z } from "zod";

export const exerciseSchema = z.object({
  name: z.string().min(3).max(150),
  description: z.string().max(255).optional().nullable(),
  mediaUrl: z.string().max(255).optional().nullable(),
});
