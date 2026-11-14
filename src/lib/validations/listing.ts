import {z} from "zod";

export const listingSchema = z.object({
  title: z.string().min(10, "Tytuł musi mieć co najmniej 10 znaków").max(80, "Tytuł nie może przekraczać 80 znaków"),
  description: z.string().min(50, "Opis musi mieć co najmniej 50 znaków").max(1000, "Opis nie może przekraczać 1000 znaków"),
  type: z.enum(["HOUSE", "APARTMENT", "STUDIO"], "Wymagany jest typ"),
  city: z.string().trim().min(1, "Wymagane jest podanie miasta"),
  address: z.string().trim().min(1, "Wymagane jest podanie adresu"),
  pricePerNight: z.coerce.number().int().positive("Cena za noc musi być dodatnią liczbą całkowitą"),
  cleaningFee: z.coerce.number().int().nonnegative("Opłata za sprzątanie musi być nieujemną liczbą całkowitą"),
  maxGuests: z.coerce.number().int().min(1, "Maksymalna liczba gości musi wynosić co najmniej 1").max(16, "Maksymalna liczba gości musi wynosić co najwyżej 16"),
  bedrooms: z.coerce.number().int().nonnegative("Liczba sypialni musi być nieujemną liczbą całkowitą"),
  bathrooms: z.coerce.number().int().positive("Liczba łazienek musi być dodatnią liczbą całkowitą"),
  amenities: z.array(z.string()).default([]),
  checkInFrom: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format godziny zameldowania musi być HH:mm"),
  checkOutUntil: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format godziny wyjścia musi być HH:mm"),
  rules: z.string().trim().min(1, "Wymagane są zasady"),
});
export type ListingInput = z.infer<typeof listingSchema>