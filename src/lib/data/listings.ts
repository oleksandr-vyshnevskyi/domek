import { prisma } from "@/lib/prisma";
import { ListingStatus } from "@/generated/prisma/client";

const MAX_INT = 2147483647;

function parseId(id: string) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1 || numericId > MAX_INT) {
    return null;
  }
  return numericId;
}

export async function getHostListingById(id: string, ownerId: string) {
  const numericId = parseId(id);
  if (!numericId) return null;
  return prisma.listing.findFirst({ where: { id: numericId, ownerId } });
}

export async function getHostListings(ownerId: string) {
  return prisma.listing.findMany({ where: { ownerId }, orderBy: { id: "desc" } });
}

export async function getListings() {
  return prisma.listing.findMany({
    where: { status: ListingStatus.ACTIVE },
    orderBy: { id: "asc" },
  });
}

export async function getListingById(id: string) {
  const numericId = parseId(id);
  if (!numericId) return null;
  const listing = await prisma.listing.findUnique({ where: { id: numericId } });
  if (!listing || listing.status !== ListingStatus.ACTIVE) return null;
  return listing;
}

export async function getAllListings() {
  return prisma.listing.findMany({
    include: { owner: { select: { name: true, email: true } } },
    orderBy: { id: "desc" },
  });
}
