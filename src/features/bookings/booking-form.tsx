"use client";

import { useActionState, useState } from "react";
import type { DateRange } from "react-day-picker";
import { pl } from "react-day-picker/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBooking, type BookingState } from "@/features/bookings/actions";
import { formatShortDate, pluralNights, toLocalDateString } from "@/lib/dates";

type BookedRange = { from: string; to: string };

type Props = {
  listingId: number;
  pricePerNight: number;
  cleaningFee: number;
  maxGuests: number;
  booked: BookedRange[];
};

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_NIGHTS = 30;
const initialState: BookingState = {};

export function BookingForm({ listingId, pricePerNight, cleaningFee, maxGuests, booked }: Props) {
  const [state, formAction, pending] = useActionState(
    createBooking.bind(null, listingId),
    initialState,
  );
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const from = range?.from;
  const to = range?.to;
  const choosingCheckout = Boolean(from && !to);
  const nights = from && to ? Math.round((to.getTime() - from.getTime()) / DAY_MS) : 0;
  const total = nights * pricePerNight + cleaningFee;

  function isDisabled(day: Date) {
    if (day < today) return true;
    const key = toLocalDateString(day);

    if (choosingCheckout && from) {
      const fromKey = toLocalDateString(from);
      if (key < fromKey) return true;
      if (key === fromKey) return false;
      if ((day.getTime() - from.getTime()) / DAY_MS > MAX_NIGHTS) return true;
      return booked.some((r) => r.from < key && r.to > fromKey);
    }

    return booked.some((r) => r.from <= key && key < r.to);
  }

  const errors = state.errors ?? {};
  const dateError = errors.startDate?.[0] ?? errors.endDate?.[0];

  return (
    <form action={formAction} className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
      <div className="flex flex-col gap-3">
        <h2 className="text-[22px]">Wybierz daty</h2>
        <Calendar
          mode="range"
          min={1}
          locale={pl}
          numberOfMonths={2}
          selected={range}
          onSelect={setRange}
          disabled={isDisabled}
          className="rounded-card border border-border bg-card p-4"
        />
        <div className="flex items-center gap-4 text-sm">
          {choosingCheckout && (
            <span className="text-muted-foreground">Teraz wybierz datę wyjazdu.</span>
          )}
          {from && (
            <button
              type="button"
              onClick={() => setRange(undefined)}
              className="font-bold text-muted-foreground hover:text-foreground"
            >
              Wyczyść daty
            </button>
          )}
        </div>
        {dateError && <p className="text-sm text-destructive">{dateError}</p>}
      </div>

      <aside className="flex flex-col gap-5 rounded-card border border-border bg-card p-6">
        <input type="hidden" name="startDate" value={from ? toLocalDateString(from) : ""} />
        <input type="hidden" name="endDate" value={to ? toLocalDateString(to) : ""} />

        <div className="flex flex-col gap-2">
          <Label htmlFor="guests">Liczba gości</Label>
          <Input
            id="guests"
            name="guests"
            type="number"
            min={1}
            max={maxGuests}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            aria-invalid={Boolean(errors.guests)}
          />
          <span className="text-xs text-muted-foreground">Maksymalnie {maxGuests}</span>
          {errors.guests && <p className="text-sm text-destructive">{errors.guests[0]}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message">Wiadomość do gospodarza (opcjonalnie)</Label>
          <textarea
            id="message"
            name="message"
            rows={3}
            maxLength={500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-xl border border-input bg-transparent px-3 py-2 text-[15px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          {errors.message && <p className="text-sm text-destructive">{errors.message[0]}</p>}
        </div>

        {nights > 0 && from && to ? (
          <dl className="flex flex-col gap-2 border-t border-border pt-4 text-[15px]">
            <div className="flex justify-between">
              <dt>{formatShortDate(from)} → {formatShortDate(to)}</dt>
              <dd>{nights} {pluralNights(nights)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{pricePerNight} zł × {nights} {pluralNights(nights)}</dt>
              <dd>{nights * pricePerNight} zł</dd>
            </div>
            <div className="flex justify-between">
              <dt>Opłata za sprzątanie</dt>
              <dd>{cleaningFee} zł</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-extrabold">
              <dt>Razem</dt>
              <dd>{total} zł</dd>
            </div>
          </dl>
        ) : (
          <p className="border-t border-border pt-4 text-sm text-muted-foreground">
            Wybierz daty, żeby zobaczyć cenę.
          </p>
        )}

        {state.message && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.message}
          </p>
        )}

        <Button type="submit" size="lg" disabled={pending || nights === 0}>
          {pending ? "Rezerwuję…" : "Zarezerwuj"}
        </Button>
      </aside>
    </form>
  );
}