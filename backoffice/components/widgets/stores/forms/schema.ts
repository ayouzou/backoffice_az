import * as z from "zod";

export const storeFormSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  address: z.string().min(2).max(500),
  template: z.enum(["XMTA", "RAYBAN"]),
  logo: z.string().optional(),
});
