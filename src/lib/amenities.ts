export const AMENITIES = {
  wifi: "Wi-Fi",
  kitchen: "Kuchnia",
  parking: "Parking",
  balcony: "Balkon",
  washer: "Pralka",
  workspace: "Biurko do pracy",
  pets: "Zwierzęta dozwolone",
  garden: "Ogród",
  fireplace: "Kominek",
  aircon: "Klimatyzacja",
  elevator: "Winda",
  sauna: "Sauna",
} as const;

export type AmenityKey = keyof typeof AMENITIES;