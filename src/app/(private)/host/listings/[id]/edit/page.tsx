import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ListingForm from "@/features/host/listing-form";
import { updateListing } from "@/features/host/actions";
import { getHostListingById } from "@/lib/data/listings";
import { requireUser } from "@/lib/session";
type Props = { params: Promise<{ id: string }> };

async function EditListing({ params }: Props) {
   const { id } = await params;
  const user = await requireUser();
  const listing = await getHostListingById(id, user.id);
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
    <div className="mx-auto flex max-w-[820px] flex-col gap-7 py-10">
      <Link
        href="/host"
        className="flex w-fit items-center gap-1.5 text-sm font-semibold hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Wróć do panelu
      </Link>
      <h1 className="text-[34px] leading-tight">Edytuj ogłoszenie</h1>
      <Suspense fallback={<p className="text-muted-foreground">Ładowanie…</p>}>
        <EditListing params={params} />
      </Suspense>
    </div>
  );
}