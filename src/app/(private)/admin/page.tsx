import { Suspense } from "react";
import Link from "next/link";
import { getAllListings } from "@/lib/data/listings";
import { setListingStatus } from "@/features/admin/actions";
import { ListingStatus } from "@/generated/prisma/client";

async function AdminListings() {
  const listings = await getAllListings();
  const active = listings.filter((l) => l.status === ListingStatus.ACTIVE).length;

  return (
    <>
      <div className="grid gap-3.5 sm:grid-cols-3">
        <Stat label="Wszystkie ogłoszenia" value={listings.length} />
        <Stat label="Aktywne" value={active} />
        <Stat label="Ukryte" value={listings.length - active} />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[760px] border-collapse text-[15px]">
          <thead>
            <tr className="text-left text-[13px] text-muted-foreground">
              <th className="px-5 py-3.5 font-bold">Obiekt</th>
              <th className="px-5 py-3.5 font-bold">Gospodarz</th>
              <th className="px-5 py-3.5 font-bold">Miasto</th>
              <th className="px-5 py-3.5 font-bold">Status</th>
              <th className="px-5 py-3.5">
                <span className="sr-only">Akcje</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => {
              const isActive = listing.status === ListingStatus.ACTIVE;
              const next = isActive ? ListingStatus.HIDDEN : ListingStatus.ACTIVE;
              return (
                <tr key={listing.id} className="border-t border-subtle">
                  <td className="px-5 py-3.5">
                    {isActive ? (
                      <Link href={`/listings/${listing.id}`} className="font-bold hover:text-primary">
                        {listing.title}
                      </Link>
                    ) : (
                      <span className="font-bold">{listing.title}</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div>{listing.owner.name}</div>
                    <div className="text-[13px] text-muted-foreground">{listing.owner.email}</div>
                  </td>
                  <td className="px-5 py-3.5">{listing.city}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[13px] font-bold ${
                        isActive ? "bg-success-soft text-success" : "bg-subtle text-muted-foreground"
                      }`}
                    >
                      {isActive ? "Aktywne" : "Ukryte"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <form action={setListingStatus.bind(null, listing.id, next)}>
                      <button
                        type="submit"
                        className={`font-bold ${
                          isActive
                            ? "text-muted-foreground hover:text-destructive"
                            : "text-primary hover:text-secondary-foreground"
                        }`}
                      >
                        {isActive ? "Ukryj" : "Przywróć"}
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-card border border-border bg-card p-5">
      <div className="text-[13px] font-bold text-muted-foreground">{label}</div>
      <div className="mt-1 text-[28px] font-extrabold">{value}</div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-7 py-10">
      <h1 className="text-[34px] leading-tight">Panel administratora</h1>
      <Suspense fallback={<p className="text-muted-foreground">Ładowanie…</p>}>
        <AdminListings />
      </Suspense>
    </div>
  );
}
