import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient , Role} from "../src/generated/prisma/client";
import { LISTINGS } from "./seed-data";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
  data: LISTINGS.map((l) => ({ ...l, ownerId: host.id })),
});
console.log("listings:", await prisma.listing.count());
  console.log("guest:", guest);
  console.log("admin:", admin);
  console.log("host:", host);
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