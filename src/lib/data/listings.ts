import { prisma } from "@/lib/prisma";
import { ListingStatus } from "@/generated/prisma/client";
import { DEMO_HOST_EMAIL } from "@/lib/demo-host";

export async function getHostListingById(id: string, ownerId: string){
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1 || numericId > 2147483647) {
    return null;
  }
  return await prisma.listing.findFirst({
   where: { id: numericId, ownerId },
  });
}
export async function getHostListings(ownerId: string) {
  return await prisma.listing.findMany({
    where: { ownerId },
    orderBy: { id: "desc" },
  });
}

export async function getListings() {
  return await prisma.listing.findMany({ where: { status: ListingStatus.ACTIVE }, orderBy: { id: "asc" } });
}

export async function getListingById(id: string) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1 || numericId > 2147483647) {
    return null;
  }
  const listing = await prisma.listing.findUnique(
    { where: { id: numericId } 
});
  if (!listing || listing.status !== ListingStatus.ACTIVE) {
    return null;
  }
  return listing;
}