import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { getHostListings } from "@/lib/data/listings";
import { hideListing } from "@/features/host/actions";
import { ListingStatus } from "@/generated/prisma/client";
import { requireUser } from "@/lib/session";
async function HostListings() {
 const user = await requireUser();
  const listings = await getHostListings(user.id);

  if (listings.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
        Nie masz jeszcze ogłoszeń.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full min-w-[720px] border-collapse text-[15px]">
        <thead>
          <tr className="text-left text-[13px] text-muted-foreground">
            <th className="px-5 py-3.5 font-bold">Obiekt</th>
            <th className="px-5 py-3.5 font-bold">Miasto</th>
            <th className="px-5 py-3.5 font-bold">Cena / noc</th>
            <th className="px-5 py-3.5 font-bold">Status</th>
            <th className="px-5 py-3.5">
              <span className="sr-only">Akcje</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => {
            const active = listing.status === ListingStatus.ACTIVE;
            return (
              <tr key={listing.id} className="border-t border-subtle">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-lg bg-subtle">
                      {listing.images[0] && (
                        <Image
                          src={listing.images[0]}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </span>
                    <span className="font-bold">{listing.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">{listing.city}</td>
                <td className="px-5 py-3.5">{listing.pricePerNight} zł</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[13px] font-bold ${
                      active
                        ? "bg-success-soft text-success"
                        : "bg-subtle text-muted-foreground"
                    }`}
                  >
                    {active ? "Aktywne" : "Ukryte"}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/host/listings/${listing.id}/edit`}
                      className="font-bold hover:text-primary"
                    >
                      Edytuj
                    </Link>
                    {active && (
                      <form action={hideListing.bind(null, listing.id)}>
                        <button
                          type="submit"
                          className="font-bold text-muted-foreground hover:text-destructive"
                        >
                          Ukryj
                        </button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function HostPage() {
  return (
    <div className="flex flex-col gap-9 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[34px] leading-tight">Panel gospodarza</h1>
        <Link
          href="/host/listings/new"
          className="flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-[15px] font-extrabold text-primary-foreground hover:bg-[#663D22] hover:text-primary-foreground"
        >
          <Plus className="size-4" aria-hidden="true" />
          Dodaj ogłoszenie
        </Link>
      </div>

      <section className="flex flex-col gap-3.5">
        <h2 className="text-[22px]">Moje ogłoszenia</h2>
        <Suspense fallback={<p className="text-muted-foreground">Ładowanie…</p>}>
          <HostListings />
        </Suspense>
      </section>
    </div>
  );
}
