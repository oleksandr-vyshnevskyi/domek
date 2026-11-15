"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";
import { createListing, type ActionState } from "@/features/host/actions";
import { AMENITIES } from "@/lib/amenities";

const initialState: ActionState = {};
const inputClass = "rounded border px-3 py-2";

function Field({
  label,
  errors,
  children,
}: {
  label: string;
  errors?: string[];
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span>{label}</span>
      {children}
      {errors?.[0] && <span className="text-sm text-red-600">{errors[0]}</span>}
    </label>
  );
}

export default function ListingForm() {
  const [state, formAction, pending] = useActionState(
    createListing,
    initialState,
  );
  const errors = state.errors ?? {};
  const value = (name: string, fallback = "") =>
    (state.values?.[name] as string | undefined) ?? fallback;
  const selectedAmenities =
    (state.values?.amenities as string[] | undefined) ?? [];
  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <Field label="Tytuł" errors={errors.title}>
       <input name="title" type="text" defaultValue={value("title")} className={inputClass} />
      </Field>

      <Field label="Opis" errors={errors.description}>
        <textarea name="description" rows={4} defaultValue={value("description")} className={inputClass} />
      </Field>

      <Field label="Typ" errors={errors.type}>
        <select name="type" defaultValue={value("type", "APARTMENT")} className={inputClass}>
          <option value="APARTMENT">Mieszkanie</option>
          <option value="HOUSE">Dom</option>
          <option value="STUDIO">Studio</option>
        </select>
      </Field>

      <Field label="Miasto" errors={errors.city}>
        <input name="city" type="text" defaultValue={value("city")} className={inputClass} />
      </Field>

      <Field label="Adres" errors={errors.address}>
        <input name="address" type="text" defaultValue={value("address")} className={inputClass} />
      </Field>

      <Field label="Cena za noc (zł)" errors={errors.pricePerNight}>
        <input name="pricePerNight" type="number" defaultValue={value("pricePerNight")} className={inputClass} />
      </Field>

      <Field label="Opłata za sprzątanie (zł)" errors={errors.cleaningFee}>
        <input
          name="cleaningFee"
          type="number"
         defaultValue={value("cleaningFee", "0")}
          className={inputClass}
        />
      </Field>

      <Field label="Maks. liczba gości" errors={errors.maxGuests}>
        <input name="maxGuests" type="number" defaultValue={value("maxGuests")} className={inputClass} />
      </Field>

      <Field label="Sypialnie" errors={errors.bedrooms}>
        <input
          name="bedrooms"
          type="number"
          defaultValue={value("bedrooms", "1")}
          className={inputClass}
        />
      </Field>

      <Field label="Łazienki" errors={errors.bathrooms}>
        <input
          name="bathrooms"
          type="number"
          defaultValue={value("bathrooms", "1")}
          className={inputClass}
        />
      </Field>

      <Field label="Zameldowanie od" errors={errors.checkInFrom}>
        <input
          name="checkInFrom"
          type="time"
          defaultValue={value("checkInFrom", "14:00")}
          className={inputClass}
        />
      </Field>

      <Field label="Wymeldowanie do" errors={errors.checkOutUntil}>
        <input
          name="checkOutUntil"
          type="time"
          defaultValue={value("checkOutUntil", "11:00")}
          className={inputClass}
        />
      </Field>

      <Field label="Zasady" errors={errors.rules}>
        <textarea name="rules" rows={3} defaultValue={value("rules")} className={inputClass} />
      </Field>

      <fieldset className="flex flex-col gap-2">
        <legend>Udogodnienia</legend>
        {Object.entries(AMENITIES).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2">
           <input type="checkbox" name="amenities" value={key} defaultChecked={selectedAmenities.includes(key)} />
            {label}
          </label>
        ))}
      </fieldset>

      {state.message && <p className="text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded border px-4 py-2"
      >
        {pending ? "Zapisywanie…" : "Dodaj ogłoszenie"}
      </button>
    </form>
  );
}
