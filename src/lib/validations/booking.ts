import { z } from "zod";

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Wybierz datę.");

export const bookingSchema = z
  .object({
    startDate: dateString,
    endDate: dateString,
    guests: z.coerce.number().int().min(1, "Minimum 1 gość."),
    message: z.string().trim().max(500, "Maksymalnie 500 znaków.").optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "Data wyjazdu musi być po dacie przyjazdu.",
    path: ["endDate"],
  });