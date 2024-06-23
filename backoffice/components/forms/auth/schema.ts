
import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(50),
});

export const registerFormSchema = z.object({
  firstName:z.string().min(3),
  lastName:z.string().min(3),
  username:z.string().min(6),
  email: z.string().email(),
  password: z.string().min(8).max(50),
});