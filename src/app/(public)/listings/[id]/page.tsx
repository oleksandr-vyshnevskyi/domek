import { getListingById } from "@/lib/data/listings";
import { Suspense } from "react";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

async function ListingDetails({ params }: Props) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) {
    notFound();
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{listing.title}</h1>
      <p className="text-gray-600">{listing.pricePerNight} zł / noc</p>
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