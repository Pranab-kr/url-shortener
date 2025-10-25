import { z } from "zod";

export const tokenVAlidationSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});
