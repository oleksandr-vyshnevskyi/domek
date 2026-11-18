import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Bath, BedDouble, Check, Clock, Users } from "lucide-react";
import { getListingById } from "@/lib/data/listings";
import { AMENITIES } from "@/lib/amenities";

type Props = { params: Promise<{ id: string }> };

const typeLabels = {
  APARTMENT: "Całe mieszkanie",
  HOUSE: "Cały dom",
  STUDIO: "Studio",
};

function amenityLabel(key: string) {
  return AMENITIES[key as keyof typeof AMENITIES] ?? key;
}

async function ListingDetails({ params }: Props) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) {
    notFound();
  }

  const [mainImage, ...restImages] = listing.images;
  const thumbs = restImages.slice(0, 4);

  return (
    <div className="flex flex-col gap-7 pt-6 pb-16">
      <Link
        href="/search"
        className="flex w-fit items-center gap-1.5 text-sm font-semibold hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Wróć do wyników
      </Link>

      <header className="flex flex-col gap-1.5">
        <h1 className="text-[28px] leading-tight sm:text-4xl">{listing.title}</h1>
        <p className="text-muted-foreground">
          {listing.city} · {listing.address}
        </p>
      </header>

      <div className="grid gap-2.5 overflow-hidden rounded-card lg:h-[410px] lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-2">
        <div className="relative aspect-4/3 bg-subtle lg:row-span-2 lg:aspect-auto">
          {mainImage && (
            <Image
              src={mainImage}
              alt={listing.title}
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          )}
        </div>
        {thumbs.map((src, i) => (
          <div key={src} className="relative hidden bg-subtle lg:block">
            <Image
              src={src}
              alt={`${listing.title} — zdjęcie ${i + 2}`}
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-2 border-b border-border pb-6">
            <h2 className="text-xl">
              {typeLabels[listing.type]} · {listing.city}
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted-foreground">
              <span className="flex items-center gap-2">
                <Users className="size-4" aria-hidden="true" />
                {listing.maxGuests} gości
              </span>
              <span className="flex items-center gap-2">
                <BedDouble className="size-4" aria-hidden="true" />
                {listing.bedrooms} sypialnie
              </span>
              <span className="flex items-center gap-2">
                <Bath className="size-4" aria-hidden="true" />
                {listing.bathrooms} łazienki
              </span>
            </div>
          </div>

          {listing.description && (
            <section className="flex flex-col gap-3">
              <h2 className="text-[22px]">O miejscu</h2>
              <p className="whitespace-pre-line leading-relaxed">{listing.description}</p>
            </section>
          )}

          {listing.amenities.length > 0 && (
            <section className="flex flex-col gap-3.5">
              <h2 className="text-[22px]">Udogodnienia</h2>
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {listing.amenities.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Check className="size-4 text-success" aria-hidden="true" />
                    {amenityLabel(item)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="flex flex-col gap-3.5">
            <h2 className="text-[22px]">Zasady</h2>
            <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              <span className="flex items-center gap-2.5">
                <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
                Zameldowanie od {listing.checkInFrom}
              </span>
              <span className="flex items-center gap-2.5">
                <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
                Wymeldowanie do {listing.checkOutUntil}
              </span>
            </div>
            {listing.rules && (
              <p className="whitespace-pre-line leading-relaxed">{listing.rules}</p>
            )}
          </section>
        </div>

        <aside className="flex flex-col gap-4 rounded-[20px] border border-border bg-card p-6 shadow-[0_10px_30px_rgba(31,36,33,0.08)] lg:sticky lg:top-24">
          <p className="text-[26px] font-extrabold">
            {listing.pricePerNight} zł
            <span className="text-[15px] font-medium text-muted-foreground"> / noc</span>
          </p>
          <Link
            href={`/listings/${listing.id}/book`}
            className="flex h-13 items-center justify-center rounded-[14px] bg-primary text-base font-extrabold text-primary-foreground hover:bg-[#663D22] hover:text-primary-foreground"
          >
            Zarezerwuj
          </Link>
          <p className="text-center text-[13px] text-muted-foreground">
            Nie pobieramy jeszcze opłaty
          </p>
          <dl className="flex flex-col gap-2.5 border-t border-border pt-4 text-[15px]">
            <div className="flex justify-between">
              <dt>Sprzątanie</dt>
              <dd>{listing.cleaningFee} zł</dd>
            </div>
            <div className="flex justify-between">
              <dt>Maks. liczba gości</dt>
              <dd>{listing.maxGuests}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

export default function ListingPage({ params }: Props) {
  return (
    <Suspense fallback={<p className="py-10 text-muted-foreground">Ładowanie…</p>}>
      <ListingDetails params={params} />
    </Suspense>
  );
}
