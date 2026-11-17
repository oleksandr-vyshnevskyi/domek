import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient , Role, BookingStatus } from "../src/generated/prisma/client";
import { LISTINGS } from "./seed-data";
import { generateListings } from "./generate-listings";
import { pickImages } from "./seed-images";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, autoSignIn: false },
});

const DEMO_EMAILS = [
  process.env.DEMO_GUEST_EMAIL!,
  process.env.DEMO_ADMIN_EMAIL!,
  process.env.DEMO_HOST_EMAIL!,
];

async function createDemoUser(
  name: string,
  email: string,
  data: { role?: Role; isHost?: boolean },
) {
  const { user } = await auth.api.signUpEmail({
    body: { name, email, password: process.env.DEMO_PASSWORD! },
  });
  return prisma.user.update({ where: { id: user.id }, data });
}
function addDays(days: number) {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function makeBooking(
  listing: { id: number; pricePerNight: number; cleaningFee: number; maxGuests: number },
  guestId: string,
  startOffset: number,
  nights: number,
  guests: number,
  status: BookingStatus,
  message?: string,
) {
  return {
    listingId: listing.id,
    guestId,
    startDate: addDays(startOffset),
    endDate: addDays(startOffset + nights),
    guests: Math.min(guests, listing.maxGuests),
    totalPrice: nights * listing.pricePerNight + listing.cleaningFee,
    status,
    message,
  };
}
async function main() {
  
await prisma.booking.deleteMany();
await prisma.listing.deleteMany();
await prisma.user.deleteMany({ where: { email: { in: DEMO_EMAILS } } });

const guest = await createDemoUser("User 1", process.env.DEMO_GUEST_EMAIL!, { role: Role.USER });
const admin = await createDemoUser("User 2", process.env.DEMO_ADMIN_EMAIL!, { role: Role.ADMIN });
const host = await createDemoUser("User 3", process.env.DEMO_HOST_EMAIL!, { role: Role.USER, isHost: true });
await prisma.booking.deleteMany();
await prisma.listing.deleteMany();
await prisma.listing.createMany({
  data: [...LISTINGS, ...generateListings(13)].map((l, i) => ({ ...l, ownerId: host.id, images: pickImages(i) })),
});
const listings = await prisma.listing.findMany({ orderBy: { id: "asc" } });
await prisma.booking.createMany({
  data: [
    makeBooking(listings[0], guest.id, 1, 3, 2, BookingStatus.CONFIRMED, "Przyjedziemy około 16:00"),
    makeBooking(listings[1], guest.id, 5, 2, 1, BookingStatus.PENDING),
    makeBooking(listings[2], guest.id, 10, 5, 4, BookingStatus.CANCELLED, "Sorry, I can't make it."),
    makeBooking(listings[3], guest.id, 15, 7, 2, BookingStatus.CONFIRMED),
    makeBooking(listings[4], guest.id, 20, 3, 1, BookingStatus.PENDING),
    makeBooking(listings[5], guest.id, 25, 4, 3, BookingStatus.CONFIRMED),
    makeBooking(listings[6], guest.id, 30, 2, 2, BookingStatus.REJECTED, "Change of plans."),
    makeBooking(listings[0], guest.id, 10, 3, 2, BookingStatus.CONFIRMED),
  ],
});
console.log("listings:", await prisma.listing.count());
  console.log("guest:", guest);
  console.log("admin:", admin);
  console.log("host:", host);
  console.log("bookings:", await prisma.booking.count());
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });