import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ListingForm from "@/features/host/listing-form";
import { createListing } from "@/features/host/actions";

export default function NewListingPage() {
  return (
    <div className="mx-auto flex max-w-[820px] flex-col gap-7 py-10">
      <Link
        href="/host"
        className="flex w-fit items-center gap-1.5 text-sm font-semibold hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Wróć do panelu
      </Link>
      <h1 className="text-[34px] leading-tight">Nowe ogłoszenie</h1>
      <ListingForm action={createListing} submitLabel="Opublikuj ogłoszenie" />
    </div>
  );
}
