"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { bookingSchema } from "@/lib/validations/booking";
import { ACTIVE_STATUSES, hasOverlap } from "@/lib/data/bookings";
import { BookingStatus, ListingStatus, Prisma } from "@/generated/prisma/client";

export type BookingState = {
  errors?: Record<string, string[] | undefined>;
  message?: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_NIGHTS = 30;

export async function createBooking(
  listingId: number,
  prevState: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const user = await requireUser();

  const result = bookingSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
      message: "Popraw błędy w formularzu.",
    };
  }

  const { guests, message } = result.data;
  const startDate = new Date(`${result.data.startDate}T00:00:00Z`);
  const endDate = new Date(`${result.data.endDate}T00:00:00Z`);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (startDate < today) {
    return { message: "Nie można rezerwować dat z przeszłości." };
  }

  const nights = Math.round((endDate.getTime() - startDate.getTime()) / DAY_MS);
  if (nights > MAX_NIGHTS) {
    return { message: `Maksymalnie ${MAX_NIGHTS} nocy.` };
  }

  const listing = await prisma.listing.findUnique({ where: { id: listingId } });
  if (!listing || listing.status !== ListingStatus.ACTIVE) {
    return { message: "To ogłoszenie jest niedostępne." };
  }
  if (listing.ownerId === user.id) {
    return { message: "Nie możesz zarezerwować własnego ogłoszenia." };
  }
  if (guests > listing.maxGuests) {
    return { errors: { guests: [`Maksymalnie ${listing.maxGuests} gości.`] } };
  }

  const totalPrice = nights * listing.pricePerNight + listing.cleaningFee;

  try {
    await prisma.$transaction(
      async (tx) => {
        if (await hasOverlap(listingId, startDate, endDate, tx)) {
          throw new Error("OVERLAP");
        }
        await tx.booking.create({
          data: {
            listingId,
            guestId: user.id,
            startDate,
            endDate,
            guests,
            totalPrice,
            message: message || null,
          },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "OVERLAP") {
      return { message: "Te daty są już zajęte. Wybierz inne." };
    }
    return { message: "Nie udało się utworzyć rezerwacji. Spróbuj ponownie." };
  }

  revalidatePath("/account/bookings");
  revalidatePath(`/listings/${listingId}`);
  redirect("/account/bookings");
}
export async function cancelBooking(id: number) {
  const user = await requireUser();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  await prisma.booking.updateMany({
    where: {
      id,
      guestId: user.id,
      status: { in: ACTIVE_STATUSES },
      startDate: { gt: today },
    },
    data: { status: BookingStatus.CANCELLED },
  });

  revalidatePath("/account/bookings");
}