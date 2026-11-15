import { prisma } from "@/lib/prisma";
import { ListingStatus } from "@/generated/prisma/client";
import { DEMO_HOST_EMAIL } from "@/lib/demo-host";

export async function getHostListingById(id: string) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1 || numericId > 2147483647) {
    return null;
  }
  return await prisma.listing.findFirst({
    where: { id: numericId, owner: { email: DEMO_HOST_EMAIL } },
  });
}
export async function getHostListings() {
  return await prisma.listing.findMany({
    where: { owner: { email: DEMO_HOST_EMAIL } },
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