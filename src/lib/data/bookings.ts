import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@/generated/prisma/client";

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