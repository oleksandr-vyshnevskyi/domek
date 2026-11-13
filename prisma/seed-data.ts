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

export type ListingSeed = {
  title: string;
  description: string;
  type: "APARTMENT" | "HOUSE" | "STUDIO";
  city: string;
  address: string;
  pricePerNight: number;
  cleaningFee: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: AmenityKey[];
  checkInFrom: string;
  checkOutUntil: string;
  rules: string;
};

export const LISTINGS: ListingSeed[] = [
  {
    title: "Mieszkanie z widokiem na Wawel",
    description:
      "Jasne mieszkanie na trzecim piętrze odnowionej kamienicy. Z okna salonu widać Wawel, a na Rynek dojdziesz w 5 minut. Na miejscu w pełni wyposażona kuchnia i miejsce do pracy.",
    type: "APARTMENT",
    city: "Kraków",
    address: "ul. Stradomska 12",
    pricePerNight: 320,
    cleaningFee: 60,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "kitchen", "balcony", "workspace", "washer"],
    checkInFrom: "15:00",
    checkOutUntil: "11:00",
    rules: "Zakaz palenia. Bez imprez. Cisza nocna 22:00–7:00.",
  },
  {
    title: "Studio przy Kazimierzu",
    description:
      "Kompaktowe studio w cichym podwórku na Kazimierzu. Blisko kawiarni, restauracji i przystanku tramwajowego. Dobre na krótki wypad do miasta.",
    type: "STUDIO",
    city: "Kraków",
    address: "ul. Józefa 18",
    pricePerNight: 240,
    cleaningFee: 40,
    maxGuests: 2,
    bedrooms: 0,
    bathrooms: 1,
    amenities: ["wifi", "kitchen"],
    checkInFrom: "14:00",
    checkOutUntil: "11:00",
    rules: "Zakaz palenia. Zwierzęta niedozwolone.",
  },
  {
    title: "Apartament nad Motławą",
    description:
      "Nowoczesny apartament z widokiem na rzekę, kilka kroków od Długiego Pobrzeża. Duże okna, wygodne łóżko i winda w budynku.",
    type: "APARTMENT",
    city: "Gdańsk",
    address: "ul. Chmielna 4",
    pricePerNight: 410,
    cleaningFee: 70,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "kitchen", "elevator", "aircon", "washer"],
    checkInFrom: "15:00",
    checkOutUntil: "11:00",
    rules: "Zakaz palenia. Bez imprez.",
  },
  {
    title: "Mieszkanie blisko plaży w Brzeźnie",
    description:
      "Spokojne mieszkanie 10 minut pieszo od plaży. Idealne na wakacje z dziećmi: dwie sypialnie, balkon i parking pod blokiem.",
    type: "APARTMENT",
    city: "Gdańsk",
    address: "ul. Zdrojowa 7",
    pricePerNight: 350,
    cleaningFee: 80,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["wifi", "kitchen", "balcony", "parking", "washer"],
    checkInFrom: "16:00",
    checkOutUntil: "10:00",
    rules: "Zakaz palenia. Cisza nocna 22:00–7:00.",
  },
  {
    title: "Domek pod Gubałówką",
    description:
      "Drewniany domek z kominkiem i widokiem na Tatry. Dwie sypialnie, duży salon i ogród. Zimą blisko wyciągu, latem szlaki zaczynają się za płotem.",
    type: "HOUSE",
    city: "Zakopane",
    address: "ul. Gubałówka 21",
    pricePerNight: 520,
    cleaningFee: 120,
    maxGuests: 6,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["wifi", "kitchen", "fireplace", "garden", "parking", "pets"],
    checkInFrom: "16:00",
    checkOutUntil: "10:00",
    rules: "Zakaz palenia w środku. Zwierzęta dozwolone po uzgodnieniu.",
  },
  {
    title: "Góralski dom z sauną",
    description:
      "Przestronny dom w stylu zakopiańskim dla większej grupy. Sauna, kominek i taras z widokiem na Giewont. Do Krupówek 15 minut spacerem.",
    type: "HOUSE",
    city: "Zakopane",
    address: "ul. Kasprusie 9",
    pricePerNight: 890,
    cleaningFee: 200,
    maxGuests: 10,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ["wifi", "kitchen", "sauna", "fireplace", "parking", "garden"],
    checkInFrom: "16:00",
    checkOutUntil: "10:00",
    rules: "Zakaz palenia. Bez imprez. Minimum 2 noce.",
  },
  {
    title: "Loft na Nadodrzu",
    description:
      "Loft w dawnej kamienicy z wysokimi sufitami i cegłą na ścianach. Blisko bulwarów nad Odrą i klimatycznych knajpek.",
    type: "APARTMENT",
    city: "Wrocław",
    address: "ul. Jedności Narodowej 45",
    pricePerNight: 280,
    cleaningFee: 50,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "kitchen", "workspace", "washer"],
    checkInFrom: "15:00",
    checkOutUntil: "11:00",
    rules: "Zakaz palenia. Cisza nocna 22:00–7:00.",
  },
  {
    title: "Studio przy Rynku",
    description:
      "Małe, ale bardzo wygodne studio 3 minuty od wrocławskiego Rynku. Wszystko, czego potrzebujesz na weekend w mieście.",
    type: "STUDIO",
    city: "Wrocław",
    address: "ul. Kiełbaśnicza 6",
    pricePerNight: 230,
    cleaningFee: 40,
    maxGuests: 2,
    bedrooms: 0,
    bathrooms: 1,
    amenities: ["wifi", "kitchen", "aircon"],
    checkInFrom: "14:00",
    checkOutUntil: "11:00",
    rules: "Zakaz palenia. Zwierzęta niedozwolone.",
  },
  {
    title: "Apartament na Powiślu",
    description:
      "Elegancki apartament w nowym budynku, blisko Wisły i Centrum Nauki Kopernik. Dobre miejsce na podróż służbową i na weekend.",
    type: "APARTMENT",
    city: "Warszawa",
    address: "ul. Dobra 30",
    pricePerNight: 380,
    cleaningFee: 70,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "kitchen", "workspace", "elevator", "aircon"],
    checkInFrom: "15:00",
    checkOutUntil: "11:00",
    rules: "Zakaz palenia. Bez imprez.",
  },
  {
    title: "Mieszkanie rodzinne na Mokotowie",
    description:
      "Duże mieszkanie z dwiema sypialniami w zielonej części Mokotowa. Obok park i metro, więc do centrum dojedziesz w 15 minut.",
    type: "APARTMENT",
    city: "Warszawa",
    address: "ul. Puławska 112",
    pricePerNight: 340,
    cleaningFee: 80,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["wifi", "kitchen", "balcony", "parking", "washer", "pets"],
    checkInFrom: "15:00",
    checkOutUntil: "11:00",
    rules: "Zakaz palenia. Zwierzęta dozwolone.",
  },
  {
    title: "Mieszkanie przy Rynku w Rzeszowie",
    description:
      "Przytulne mieszkanie w samym centrum, kilka minut od Rynku i bulwarów. Dobre miejsce na krótki pobyt w mieście.",
    type: "APARTMENT",
    city: "Rzeszów",
    address: "ul. 3 Maja 14",
    pricePerNight: 210,
    cleaningFee: 40,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "kitchen", "workspace"],
    checkInFrom: "14:00",
    checkOutUntil: "11:00",
    rules: "Zakaz palenia. Cisza nocna 22:00–7:00.",
  },
  {
    title: "Dom z ogrodem pod Rzeszowem",
    description:
      "Dom z dużym ogrodem i grillem, 15 minut samochodem od centrum. Cisza, zieleń i miejsce na rodzinny wypoczynek.",
    type: "HOUSE",
    city: "Rzeszów",
    address: "ul. Słocińska 40",
    pricePerNight: 450,
    cleaningFee: 100,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["wifi", "kitchen", "garden", "parking", "pets", "washer"],
    checkInFrom: "16:00",
    checkOutUntil: "10:00",
    rules: "Zakaz palenia w środku. Bez imprez.",
  },
];

export const VALIDATION_MESSAGES = {
  required: "To pole jest wymagane",
  titleMin: "Tytuł musi mieć co najmniej 10 znaków",
  titleMax: "Tytuł może mieć maksymalnie 80 znaków",
  descriptionMin: "Opis musi mieć co najmniej 50 znaków",
  priceMin: "Cena musi być większa od 0",
  priceInt: "Cena musi być liczbą całkowitą",
  guestsRange: "Liczba gości musi być od 1 do 16",
  bedroomsMin: "Liczba sypialni nie może być ujemna",
  bathroomsMin: "Musi być co najmniej 1 łazienka",
  cityRequired: "Podaj miasto",
  addressRequired: "Podaj adres",
  invalidType: "Wybierz typ obiektu",
  invalidTime: "Podaj godzinę w formacie GG:MM",
  invalidEmail: "Podaj poprawny adres e-mail",
} as const;