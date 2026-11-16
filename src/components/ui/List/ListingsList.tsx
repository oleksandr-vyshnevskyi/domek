import Image from "next/image";
import Link from "next/link";
import { BedDouble, Users } from "lucide-react";
import { getListings } from "@/lib/data/listings";

const typeLabels = {
  APARTMENT: "Apartament",
  HOUSE: "Dom",
  STUDIO: "Studio",
};

export default async function ListingsList() {
  const listings = await getListings();

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <li key={listing.id}>
          <Link
            href={`/listings/${listing.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-card transition-shadow"
          >
            <div className="relative aspect-[4/3] bg-muted">
              {listing.images[0] && (
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 "
                />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <p className="text-sm text-muted-foreground">
                {typeLabels[listing.type]} · {listing.city}
              </p>
              <h3 className="line-clamp-2 text-h3">{listing.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="size-4" />
                  {listing.maxGuests}
                </span>
                <span className="flex items-center gap-1.5">
                  <BedDouble className="size-4" />
                  {listing.bedrooms}
                </span>
              </div>
              <p className="mt-auto pt-2">
                <span className="text-h3 font-extrabold text-primary">
                  {listing.pricePerNight} zł
                </span>
                <span className="text-sm text-muted-foreground"> / noc</span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}