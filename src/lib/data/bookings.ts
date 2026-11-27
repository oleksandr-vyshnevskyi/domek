import { prisma } from "@/lib/prisma";
import { BookingStatus, Prisma } from "@/generated/prisma/client";

export const ACTIVE_STATUSES = [BookingStatus.PENDING, BookingStatus.CONFIRMED];

export async function getBookedRanges(listingId: number) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return prisma.booking.findMany({
    where: {
      listingId,
      status: { in: ACTIVE_STATUSES },
      endDate: { gt: today },
    },
    select: { startDate: true, endDate: true },
    orderBy: { startDate: "asc" },
  });
}
export async function hasOverlap(
  listingId: number,
  startDate: Date,
  endDate: Date,
  db: Prisma.TransactionClient = prisma,
) {
  const count = await db.booking.count({
    where: {
      listingId,
      status: { in: ACTIVE_STATUSES },
      startDate: { lt: endDate },
      endDate: { gt: startDate },
    },
  });
  return count > 0;
}
export async function getGuestBookings(guestId: string) {
  return prisma.booking.findMany({
    where: { guestId },
    include: {
      listing: { select: { id: true, title: true, city: true, images: true } },
    },
    orderBy: { startDate: "asc" },
  });
}