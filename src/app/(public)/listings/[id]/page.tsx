import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Bath, BedDouble, Check, Users } from "lucide-react";
import { getListingById } from "@/lib/data/listings";

type Props = { params: Promise<{ id: string }> };

const typeLabels = {
  APARTMENT: "Apartament",
  HOUSE: "Dom",
  STUDIO: "Studio",
};

async function ListingDetails({ params }: Props) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) {
    notFound();
  }

  const [mainImage, ...restImages] = listing.images;
  const thumbs = restImages.slice(0, 4);

  return (
    <div className="py-8">
      <header className="mb-6">
        <p className="text-sm text-muted-foreground">
          {typeLabels[listing.type]} · {listing.city}
        </p>
        <h1 className="mt-1 text-h1">{listing.title}</h1>
        <p className="mt-1 text-muted-foreground">{listing.address}</p>
      </header>

      <div className="grid gap-2 overflow-hidden rounded-block lg:grid-cols-2">
        <div className="relative aspect-4/3 bg-muted">
          {mainImage && (
            <Image
              src={mainImage}
              alt={listing.title}
              fill
              priority
              sizes="(min-width: 1200px) 600px, 100vw"
              className="object-cover"
            />
          )}
        </div>
        {thumbs.length > 0 && (
          <div className="hidden grid-cols-2 grid-rows-2 gap-2 lg:grid">
            {thumbs.map((src, i) => (
              <div key={src} className="relative bg-muted">
                <Image
                  src={src}
                  alt={`${listing.title} ${i + 2}`}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-10">
          <div className="flex flex-wrap gap-6 border-b border-border pb-6">
            <span className="flex items-center gap-2">
              <Users className="size-5 text-primary" />
              {listing.maxGuests} gości
            </span>
            <span className="flex items-center gap-2">
              <BedDouble className="size-5 text-primary" />
              {listing.bedrooms} sypialni
            </span>
            <span className="flex items-center gap-2">
              <Bath className="size-5 text-primary" />
              {listing.bathrooms} łazienek
            </span>
          </div>

          {listing.description && (
            <section>
              <h2 className="mb-3 text-h2">Opis</h2>
              <p className="whitespace-pre-line leading-relaxed">
                {listing.description}
              </p>
            </section>
          )}

          {listing.amenities.length > 0 && (
            <section>
              <h2 className="mb-3 text-h2">Udogodnienia</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {listing.amenities.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="size-4 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="mb-3 text-h2">Zasady pobytu</h2>
            <p className="whitespace-pre-line leading-relaxed">{listing.rules}</p>
          </section>
        </div>

        <aside className="h-fit rounded-card border border-border bg-card p-6 lg:sticky lg:top-6">
          <p>
            <span className="text-h2 font-extrabold text-primary">
              {listing.pricePerNight} zł
            </span>
            <span className="text-muted-foreground"> / noc</span>
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Sprzątanie</dt>
              <dd>{listing.cleaningFee} zł</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Zameldowanie od</dt>
              <dd>{listing.checkInFrom}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Wymeldowanie do</dt>
              <dd>{listing.checkOutUntil}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
export default function ListingPage({ params }: Props) {
  return (
    <Suspense fallback={<p>Ładowanie…</p>}>
      <ListingDetails params={params} />
    </Suspense>
  );
}