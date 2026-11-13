import { fakerPL as faker } from "@faker-js/faker";
import { AMENITIES, type ListingSeed, type AmenityKey } from "./seed-data";

const CITIES = ["Kraków", "Gdańsk", "Zakopane", "Wrocław", "Warszawa", "Rzeszów"];

const NOUNS = {
  APARTMENT: { noun: "mieszkanie", adjectives: ["Jasne", "Przytulne", "Nowoczesne", "Komfortowe"] },
  HOUSE: { noun: "dom", adjectives: ["Jasny", "Przytulny", "Nowoczesny", "Komfortowy"] },
  STUDIO: { noun: "studio", adjectives: ["Jasne", "Przytulne", "Nowoczesne", "Komfortowe"] },
};

const DESCRIPTIONS = [
  "Przytulne miejsce w dobrej lokalizacji, blisko komunikacji miejskiej, sklepów i restauracji. Wygodne łóżko i w pełni wyposażona kuchnia.",
  "Jasne wnętrze po remoncie, spokojna okolica i szybki dojazd do centrum. Dobre miejsce na weekend lub dłuższy pobyt.",
  "Wygodny nocleg dla podróżujących służbowo i turystów. Cicha okolica, szybkie Wi-Fi i wszystko, czego potrzebujesz na miejscu.",
  "Przestronne wnętrze z dużą ilością światła, kilka minut od przystanku. Idealne dla rodziny lub małej grupy znajomych.",
];

const RULES = [
  "Zakaz palenia. Bez imprez.",
  "Zakaz palenia. Cisza nocna 22:00–7:00.",
  "Zakaz palenia. Zwierzęta niedozwolone.",
  "Zakaz palenia w środku. Bez imprez.",
];

export function generateListings(count: number): ListingSeed[] {
  faker.seed(2026);
  return Array.from({ length: count }, () => {
    const city = faker.helpers.arrayElement(CITIES);
    const type = faker.helpers.arrayElement(["APARTMENT", "HOUSE", "STUDIO"] as const);
    const adjective = faker.helpers.arrayElement(NOUNS[type].adjectives);
    const title = `${adjective} ${NOUNS[type].noun} – ${city}`;
    const description = faker.helpers.arrayElement(DESCRIPTIONS);
    const address = `${faker.location.street()} ${faker.location.buildingNumber()}`;

    const bedrooms =
      type === "STUDIO"
        ? 0
        : type === "APARTMENT"
          ? faker.number.int({ min: 1, max: 3 })
          : faker.number.int({ min: 2, max: 5 });
    const maxGuests = type === "STUDIO" ? 2 : bedrooms * 2;
    const bathrooms = type === "HOUSE" ? faker.number.int({ min: 1, max: 3 }) : 1;
    const pricePerNight =
      type === "STUDIO"
        ? faker.number.int({ min: 180, max: 260 })
        : type === "APARTMENT"
          ? faker.number.int({ min: 250, max: 450 })
          : faker.number.int({ min: 400, max: 900 });
    const cleaningFee = Math.round(pricePerNight * 0.2);

    const amenities = faker.helpers.arrayElements(Object.keys(AMENITIES) as AmenityKey[], { min: 2, max: 6 });
    const checkInFrom = faker.helpers.arrayElement(["14:00", "15:00", "16:00"]);
    const checkOutUntil = faker.helpers.arrayElement(["10:00", "11:00", "12:00"]);
    const rules = faker.helpers.arrayElement(RULES);

    return {
      title,
      description,
      type,
      city,
      address,
      pricePerNight,
      cleaningFee,
      maxGuests,
      bedrooms,
      bathrooms,
      amenities,
      checkInFrom,
      checkOutUntil,
      rules,
    };
  });
}