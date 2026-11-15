import ListingForm from "@/features/host/ListingForm";
import {createListing} from "@/features/host/actions";

export default function NewListingPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Nowe ogłoszenie</h1>
    <ListingForm action={createListing} submitLabel="Dodaj ogłoszenie" />
    </div>
  );
}