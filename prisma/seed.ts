import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient , Role, BookingStatus } from "../src/generated/prisma/client";
import { LISTINGS } from "./seed-data";
import { generateListings } from "./generate-listings";
import { pickImages } from "./seed-images";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
function addDays(days: number) {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function makeBooking(
  listing: { id: number; pricePerNight: number; cleaningFee: number; maxGuests: number },
  guestId: number,
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
  
  const guest = await prisma.user.upsert({
  where: { email: "someoneguest@demo.test" },
  update: {},
  create: { name: "User 1", role: Role.USER, email: "someoneguest@demo.test" },
});

  const admin = await prisma.user.upsert({
  where: { email: "someoneadmin@demo.test" },
  update: {},
  create: { name: "User 2", role: Role.ADMIN, email: "someoneadmin@demo.test" },
});
  const host = await prisma.user.upsert({
  where: { email: "someonehost@demo.test" },
  update: {},
  create: { name: "User 3", role: Role.USER, isHost: true, email: "someonehost@demo.test" },
});
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