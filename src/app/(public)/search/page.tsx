import ListingsList from "@/features/listings/listings-list";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <div className="flex flex-col gap-6 py-8 sm:py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-[28px] leading-tight">Noclegi</h1>
        <p className="text-[15px] text-muted-foreground">
          Mieszkania i domy od gospodarzy w całej Polsce
        </p>
      </div>
      <Suspense fallback={<ListingsSkeleton />}>
        <ListingsList />
      </Suspense>
    </div>
  );
}

function ListingsSkeleton() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: 6 }, (_, i) => (
        <li key={i} className="flex flex-col gap-3">
          <div className="aspect-4/3 animate-pulse rounded-card bg-subtle" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-subtle" />
          <div className="h-5 w-2/3 animate-pulse rounded bg-subtle" />
        </li>
      ))}
    </ul>
  );
}
