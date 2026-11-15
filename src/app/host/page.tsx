import { Suspense } from "react";
import Link from "next/link";
import { getHostListings } from "@/lib/data/listings";
import { hideListing } from "@/features/host/actions";
import { ListingStatus } from "@/generated/prisma/client";

async function HostListings() {
  const listings = await getHostListings();

  return (
    <ul className="space-y-3">
      {listings.map((listing) => (
       <li key={listing.id} className="flex items-center gap-4">
  <span>{listing.title}</span>
  <span className="text-sm text-gray-600">
    {listing.status === ListingStatus.ACTIVE ? "Aktywne" : "Ukryte"}
  </span>
  <Link href={`/host/listings/${listing.id}/edit`} className="underline">
    Edytuj
  </Link>
  {listing.status === ListingStatus.ACTIVE && (
    <form action={hideListing.bind(null, listing.id)}>
      <button type="submit" className="rounded border px-3 py-1">
        Ukryj
      </button>
    </form>
  )}
</li>
      ))}
    </ul>
  );
}

export default function HostPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Moje ogłoszenia</h1>
      <Link href="/host/listings/new" className="mb-4 inline-block underline">
        Dodaj ogłoszenie
      </Link>
      <Suspense fallback={<p>Ładowanie…</p>}>
        <HostListings />
      </Suspense>
    </div>
  );
}