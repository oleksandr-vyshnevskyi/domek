"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { listingSchema } from "@/lib/validations/listing";
import { ListingStatus } from "@/generated/prisma/client";
import { requireHost, requireUser } from "@/lib/session";

export async function updateListing(
  id: number,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireHost();
  const raw = Object.fromEntries(formData);
  const data = { ...raw, amenities: formData.getAll("amenities") };
  const result = listingSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
      message: "Popraw błędy w formularzu.",
      values: data as Record<string, string | string[]>,
    };
  }

  try {
    const { count } = await prisma.listing.updateMany({
      where: { id, ownerId: user.id },
      data: result.data,
    });
    if (count === 0) {
      return { message: "Nie znaleziono ogłoszenia." };
    }
  } catch {
    return { message: "Nie udało się zapisać ogłoszenia." };
  }

  revalidatePath("/search");
  revalidatePath("/host");
  revalidatePath(`/listings/${id}`);
  redirect("/host");
}
export type ActionState = {
  errors?: Record<string, string[] | undefined>;
  message?: string;
  values?: Record<string, string | string[]>;
};

export async function createListing(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireHost();
  const raw = Object.fromEntries(formData);
  const data = { ...raw, amenities: formData.getAll("amenities") };
  const result = listingSchema.safeParse(data);

  if (!result.success) {
      return {
      errors: z.flattenError(result.error).fieldErrors,
      message: "Popraw błędy w formularzu.",
      values: data as Record<string, string | string[]>,
    };
  }

 

  try {
    await prisma.listing.create({
      data: { ...result.data, ownerId: user.id },
    });
  } catch {
    return { message: "Nie udało się zapisać ogłoszenia." };
  }
  revalidatePath("/search");
  revalidatePath("/host");
  redirect("/host");
}
export async function hideListing(id: number) {
  const user = await requireHost();
  await prisma.listing.updateMany({
    where: { id, ownerId: user.id },
    data: { status: ListingStatus.HIDDEN },
  });
  revalidatePath("/host");
  revalidatePath("/search");
}

export async function becomeHost() {
  const user = await requireUser();
  await prisma.user.update({ where: { id: user.id }, data: { isHost: true } });
  revalidatePath("/host");
  redirect("/host");
}
