import { prisma } from "@/lib/prisma";
import { ListingStatus } from "@/generated/prisma/client";

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