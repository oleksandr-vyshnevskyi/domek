"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { ListingStatus } from "@/generated/prisma/client";

export async function setListingStatus(id: number, status: ListingStatus) {
  await requireAdmin();
  await prisma.listing.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
  revalidatePath("/search");
  revalidatePath(`/listings/${id}`);
}
