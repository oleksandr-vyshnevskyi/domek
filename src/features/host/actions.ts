"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { listingSchema } from "@/lib/validations/listing";
import { ListingStatus } from "@/generated/prisma/client";
import { DEMO_HOST_EMAIL } from "@/lib/demo-host";

export async function updateListing(
  id: number,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
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
      where: { id, owner: { email: DEMO_HOST_EMAIL } },
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

  const host = await prisma.user.findUnique({
    where: { email: DEMO_HOST_EMAIL },
  });

  if (!host) {
    return { message: "Nie znaleziono gospodarza." };
  }

  try {
    await prisma.listing.create({
      data: { ...result.data, ownerId: host.id },
    });
  } catch {
    return { message: "Nie udało się zapisać ogłoszenia." };
  }
  revalidatePath("/search");
  revalidatePath("/host");
  redirect("/host");
}
export async function hideListing(id: number) {
  await prisma.listing.updateMany({
    where: { id, owner: { email: DEMO_HOST_EMAIL } },
    data: { status: ListingStatus.HIDDEN },
  });
  revalidatePath("/host");
  revalidatePath("/search");
}