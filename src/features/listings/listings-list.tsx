import Image from "next/image";
import Link from "next/link";
import { BedDouble, Users } from "lucide-react";
import { getListings } from "@/lib/data/listings";

const typeLabels = {
  APARTMENT: "Mieszkanie",
  HOUSE: "Dom",
  STUDIO: "Studio",
};

export default async function ListingsList() {
  const listings = await getListings();

  if (listings.length === 0) {
    return (
      <div className="rounded-card border border-border bg-card p-10 text-center text-muted-foreground">
        Brak dostępnych ofert.
      </div>
    );
  }

  return (
    <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <li key={listing.id}>
          <Link
            href={`/listings/${listing.id}`}
            className="group flex h-full flex-col gap-2.5 text-foreground hover:text-foreground"
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-card bg-subtle">
              {listing.images[0] && (
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}
              <span className="absolute top-3 left-3 rounded-full bg-card/95 px-2.5 py-1 text-xs font-bold">
                {typeLabels[listing.type]}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="line-clamp-1 text-base leading-snug group-hover:text-primary">
                {listing.title}
              </h3>
              <p className="text-sm text-muted-foreground">{listing.city}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="size-4" aria-hidden="true" />
                  {listing.maxGuests} gości
                </span>
                <span className="flex items-center gap-1.5">
                  <BedDouble className="size-4" aria-hidden="true" />
                  {listing.bedrooms} syp.
                </span>
              </div>
              <p className="mt-1 text-[15px]">
                <b className="font-extrabold">od {listing.pricePerNight} zł</b>
                <span className="text-muted-foreground"> / noc</span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
