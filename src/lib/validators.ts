import { z } from "zod";

const optionalString = (max: number) =>
  z.string().max(max).optional().or(z.literal(""));

export const contactSchema = z.object({
  full_name: z.string().min(1, "Tell us your name").max(120),
  email: z.string().email("Enter a valid email"),
  company: optionalString(160),
  phone: optionalString(40),
  service_interest: optionalString(80),
  message: z.string().min(1, "Add a short message").max(4000),
  // Honeypot — must be empty.
  company_url: z.string().max(0).optional().or(z.literal("")),
});

export const applicationSchema = z.object({
  full_name: z.string().min(1, "Tell us your name").max(120),
  email: z.string().email("Enter a valid email"),
  phone: optionalString(40),
  linkedin_url: z
    .string()
    .url("Enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  current_role: optionalString(120),
  message: optionalString(4000),
  job_id: z.string().uuid().optional().or(z.literal("")),
  job_title: optionalString(200),
  // Honeypot — must be empty.
  company_url: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ApplicationInput = z.infer<typeof applicationSchema>;
