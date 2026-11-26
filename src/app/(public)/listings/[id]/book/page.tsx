import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getListingById } from "@/lib/data/listings";
import { getBookedRanges } from "@/lib/data/bookings";
import { requireUser } from "@/lib/session";
import { toDateString } from "@/lib/dates";
import { BookingForm } from "@/features/bookings/booking-form";

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const listing = await getListingById(id);
  if (!listing) notFound();

  const isOwner = listing.ownerId === user.id;
  const ranges = isOwner ? [] : await getBookedRanges(listing.id);
  const booked = ranges.map((r) => ({ from: toDateString(r.startDate), to: toDateString(r.endDate) }));

  return (
    <div className="flex flex-col gap-7 py-10">
      <Link
        href={`/listings/${listing.id}`}
        className="flex items-center gap-2 self-start text-[15px] font-bold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Wróć do ogłoszenia
      </Link>

      <div className="flex flex-col gap-1">
        <h1 className="text-[34px] leading-tight">Rezerwacja</h1>
        <p className="text-muted-foreground">
          {listing.title} · {listing.city}
        </p>
      </div>

      {isOwner ? (
        <div className="rounded-card border border-border bg-card p-8 text-center text-muted-foreground">
          To Twoje ogłoszenie. Nie możesz go zarezerwować.
        </div>
      ) : (
        <BookingForm
          listingId={listing.id}
          pricePerNight={listing.pricePerNight}
          cleaningFee={listing.cleaningFee}
          maxGuests={listing.maxGuests}
          booked={booked}
        />
      )}
    </div>
  );
}