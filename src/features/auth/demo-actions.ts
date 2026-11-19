"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const DEMO_ACCOUNTS = {
  guest: { email: process.env.DEMO_GUEST_EMAIL, redirectTo: "/account/bookings" },
  host: { email: process.env.DEMO_HOST_EMAIL, redirectTo: "/host" },
} as const;

export type DemoRole = keyof typeof DEMO_ACCOUNTS;

export async function signInAsDemo(role: DemoRole) {
  const { email, redirectTo } = DEMO_ACCOUNTS[role];
  const password = process.env.DEMO_PASSWORD;

  if (!email || !password) {
    throw new Error("Demo accounts are not configured");
  }

  await auth.api.signInEmail({ body: { email, password } });
  redirect(redirectTo);
}
