import { z } from "zod";

export const rsvpSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  attending: z.enum(["yes", "no", "maybe"], {
    error: "Let us know if you'll be attending",
  }),
  mealPreference: z.string().trim().min(1, "Please select a meal preference"),
  guestCount: z.number().int().min(1, "At least 1 guest").max(10, "Max 10 guests"),
  message: z.string().trim().optional(),
});

export type RsvpFormValues = z.infer<typeof rsvpSchema>;
