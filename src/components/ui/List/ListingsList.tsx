
import { getListings } from "@/lib/data/listings";
import Link from "next/link";
export default async function ListingsList() {
  const listings = await getListings();

  return (
    <ul className="space-y-2">
      {listings.map((listing) => (
        <li key={listing.id}><Link href={`/listings/${listing.id}`}>{listing.title}</Link>.</li>
      ))}
    </ul>
  );
}

