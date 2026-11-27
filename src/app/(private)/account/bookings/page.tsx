import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { requireUser } from "@/lib/session";
import { ACTIVE_STATUSES, getGuestBookings } from "@/lib/data/bookings";
import { cancelBooking } from "@/features/bookings/actions";
import { BOOKING_STATUS } from "@/features/bookings/booking-status";
import { formatBookingDate } from "@/lib/dates";

type GuestBooking = Awaited<ReturnType<typeof getGuestBookings>>[number];

function BookingCard({ booking, canCancel }: { booking: GuestBooking; canCancel: boolean }) {
  const status = BOOKING_STATUS[booking.status];

  return (
    <li className="flex flex-col gap-4 rounded-card border border-border bg-card p-4 sm:flex-row sm:items-center">
      <span className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-subtle sm:w-36">
        {booking.listing.images[0] && (
          <Image
            src={booking.listing.images[0]}
            alt=""
            fill
            sizes="(min-width: 640px) 144px, 100vw"
            className="object-cover"
          />
        )}
      </span>

      <div className="flex flex-1 flex-col gap-1.5">
        <span className={`self-start rounded-full px-2.5 py-1 text-[13px] font-bold ${status.className}`}>
          {status.label}
        </span>
        <Link href={`/listings/${booking.listing.id}`} className="text-[17px] font-bold hover:text-primary">
          {booking.listing.title}
        </Link>
        <span className="text-[15px] text-muted-foreground">
          {booking.listing.city} · {formatBookingDate(booking.startDate)} – {formatBookingDate(booking.endDate)} ·{" "}
          {booking.guests} {booking.guests === 1 ? "gość" : "gości"}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <span className="text-[17px] font-extrabold">{booking.totalPrice} zł</span>
        {canCancel && (
          <form action={cancelBooking.bind(null, booking.id)}>
            <button type="submit" className="text-[15px] font-bold text-muted-foreground hover:text-destructive">
              Anuluj
            </button>
          </form>
        )}
      </div>
    </li>
  );
}

async function GuestBookings() {
  const user = await requireUser();
  const bookings = await getGuestBookings(user.id);

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-card border border-border bg-card p-10 text-center">
        <p className="text-muted-foreground">Nie masz jeszcze rezerwacji.</p>
        <Link href="/search" className="font-bold text-primary hover:underline">
          Znajdź nocleg
        </Link>
      </div>
    );
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const isActive = (b: GuestBooking) => ACTIVE_STATUSES.some((s) => s === b.status);
  const upcoming = bookings.filter((b) => isActive(b) && b.endDate > today);
  const history = bookings.filter((b) => !upcoming.includes(b)).reverse();

  return (
    <div className="flex flex-col gap-9">
      <section className="flex flex-col gap-3.5">
        <h2 className="text-[22px]">Nadchodzące</h2>
        {upcoming.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {upcoming.map((b) => (
              <BookingCard key={b.id} booking={b} canCancel={b.startDate > today} />
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Brak nadchodzących rezerwacji.</p>
        )}
      </section>

      {history.length > 0 && (
        <section className="flex flex-col gap-3.5">
          <h2 className="text-[22px]">Historia</h2>
          <ul className="flex flex-col gap-3">
            {history.map((b) => (
              <BookingCard key={b.id} booking={b} canCancel={false} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default function BookingsPage() {
  return (
    <div className="flex flex-col gap-7 py-10">
      <h1 className="text-[34px] leading-tight">Moje rezerwacje</h1>
      <Suspense fallback={<p className="text-muted-foreground">Ładowanie…</p>}>
        <GuestBookings />
      </Suspense>
    </div>
  );
}