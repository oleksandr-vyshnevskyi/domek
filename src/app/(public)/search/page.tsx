import ListingsList from "@/components/ui/List/ListingsList";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Wyszukiwarka</h1>
      <Suspense fallback={<p>Ładowanie…</p>}>
        <ListingsList />
      </Suspense>
    </div>
  );
}