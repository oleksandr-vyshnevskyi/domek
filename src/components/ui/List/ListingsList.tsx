
import { getListings } from "@/lib/data/listings";

export default async function ListingsList() {
  const listings = await getListings();

  return (
    <ul className="space-y-2">
      {listings.map((listing) => (
        <li key={listing.id}>{listing.title}</li>
      ))}
    </ul>
  );
}

