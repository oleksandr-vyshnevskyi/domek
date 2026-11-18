"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";
import type { ActionState } from "@/features/host/actions";
import { AMENITIES } from "@/lib/amenities";
import { Button } from "@/components/ui/Button/button";

const inputClass =
  "w-full rounded-xl border border-field bg-card px-3.5 py-3 text-base font-medium outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive";

type Props = {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  initialValues?: Record<string, string | string[]>;
  submitLabel: string;
};

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
    <label className="flex flex-col gap-1.5 text-sm font-bold">
      <span>{label}</span>
      {children}
      {errors?.[0] && (
        <span className="text-[13px] font-semibold text-destructive">{errors[0]}</span>
      )}
    </label>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3.5">
      <h2 className="text-xl">{title}</h2>
      {children}
    </section>
  );
}

export default function ListingForm({ action, initialValues, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, {
    values: initialValues,
  });
  const errors = state.errors ?? {};
  const value = (name: string, fallback = "") =>
    (state.values?.[name] as string | undefined) ?? fallback;
  const selectedAmenities = (state.values?.amenities as string[] | undefined) ?? [];
  const invalid = (name: string) => (errors[name]?.length ? true : undefined);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <Section title="Podstawowe informacje">
        <Field label="Tytuł" errors={errors.title}>
          <input
            name="title"
            type="text"
            placeholder="Np. Jasne mieszkanie przy Rynku"
            defaultValue={value("title")}
            aria-invalid={invalid("title")}
            className={inputClass}
          />
        </Field>
        <Field label="Opis" errors={errors.description}>
          <textarea
            name="description"
            rows={5}
            placeholder="Opisz miejsce, okolicę i to, co wyróżnia Twój obiekt"
            defaultValue={value("description")}
            aria-invalid={invalid("description")}
            className={`${inputClass} resize-y`}
          />
        </Field>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Typ" errors={errors.type}>
            <select
              name="type"
              defaultValue={value("type", "APARTMENT")}
              className={inputClass}
            >
              <option value="APARTMENT">Mieszkanie</option>
              <option value="HOUSE">Dom</option>
              <option value="STUDIO">Studio</option>
            </select>
          </Field>
          <Field label="Cena za noc (zł)" errors={errors.pricePerNight}>
            <input
              name="pricePerNight"
              type="number"
              placeholder="320"
              defaultValue={value("pricePerNight")}
              aria-invalid={invalid("pricePerNight")}
              className={inputClass}
            />
          </Field>
          <Field label="Opłata za sprzątanie (zł)" errors={errors.cleaningFee}>
            <input
              name="cleaningFee"
              type="number"
              defaultValue={value("cleaningFee", "0")}
              aria-invalid={invalid("cleaningFee")}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Lokalizacja">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Miasto" errors={errors.city}>
            <input
              name="city"
              type="text"
              placeholder="Kraków"
              defaultValue={value("city")}
              aria-invalid={invalid("city")}
              className={inputClass}
            />
          </Field>
          <Field label="Adres" errors={errors.address}>
            <input
              name="address"
              type="text"
              placeholder="ul. Grodzka 1"
              defaultValue={value("address")}
              aria-invalid={invalid("address")}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Pojemność">
        <div className="grid gap-3.5 sm:grid-cols-3">
          <Field label="Maks. gości" errors={errors.maxGuests}>
            <input
              name="maxGuests"
              type="number"
              defaultValue={value("maxGuests", "2")}
              aria-invalid={invalid("maxGuests")}
              className={inputClass}
            />
          </Field>
          <Field label="Sypialnie" errors={errors.bedrooms}>
            <input
              name="bedrooms"
              type="number"
              defaultValue={value("bedrooms", "1")}
              aria-invalid={invalid("bedrooms")}
              className={inputClass}
            />
          </Field>
          <Field label="Łazienki" errors={errors.bathrooms}>
            <input
              name="bathrooms"
              type="number"
              defaultValue={value("bathrooms", "1")}
              aria-invalid={invalid("bathrooms")}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <fieldset className="flex flex-col gap-3.5">
        <legend className="mb-3.5 text-xl font-extrabold">Udogodnienia</legend>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {Object.entries(AMENITIES).map(([key, label]) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-field bg-card px-3.5 py-3 text-[15px] transition-colors hover:border-primary has-checked:border-primary has-checked:bg-secondary"
            >
              <input
                type="checkbox"
                name="amenities"
                value={key}
                defaultChecked={selectedAmenities.includes(key)}
                className="size-[18px] accent-primary"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <Section title="Zasady">
        <div className="grid gap-3.5 sm:grid-cols-2">
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
        </div>
        <Field label="Dodatkowe zasady" errors={errors.rules}>
          <textarea
            name="rules"
            rows={3}
            placeholder="Np. zakaz palenia, cisza nocna od 22:00"
            defaultValue={value("rules")}
            aria-invalid={invalid("rules")}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </Section>

      {state.message && (
        <p role="alert" className="font-semibold text-destructive">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Zapisywanie…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
