import { Suspense } from "react";
import { notFound } from "next/navigation";
import ListingForm from "@/features/host/ListingForm";
import { updateListing } from "@/features/host/actions";
import { getHostListingById } from "@/lib/data/listings";

type Props = { params: Promise<{ id: string }> };

async function EditListing({ params }: Props) {
  const { id } = await params;
  const listing = await getHostListingById(id);
  if (!listing) {
    notFound();
  }

  const initialValues = {
    title: listing.title,
    description: listing.description ?? "",
    type: listing.type,
    city: listing.city,
    address: listing.address,
    pricePerNight: String(listing.pricePerNight),
    cleaningFee: String(listing.cleaningFee),
    maxGuests: String(listing.maxGuests),
    bedrooms: String(listing.bedrooms),
    bathrooms: String(listing.bathrooms),
    checkInFrom: listing.checkInFrom,
    checkOutUntil: listing.checkOutUntil,
    rules: listing.rules,
    amenities: listing.amenities,
  };

  return (
    <ListingForm
      action={updateListing.bind(null, listing.id)}
      initialValues={initialValues}
      submitLabel="Zapisz zmiany"
    />
  );
}

export default function EditListingPage({ params }: Props) {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Edytuj ogłoszenie</h1>
      <Suspense fallback={<p>Ładowanie…</p>}>
        <EditListing params={params} />
      </Suspense>
    </div>
  );
}