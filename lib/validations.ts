import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  contactMethod: z.enum(["phone", "email"]).optional(),
  locale: z.enum(["en", "de"]).optional().default("en"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
