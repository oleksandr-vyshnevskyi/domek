import { BookingStatus } from "@/generated/prisma/client";

export const BOOKING_STATUS: Record<BookingStatus, { label: string; className: string }> = {
  PENDING: { label: "Oczekuje na potwierdzenie", className: "bg-secondary text-secondary-foreground" },
  CONFIRMED: { label: "Potwierdzona", className: "bg-success-soft text-success" },
  REJECTED: { label: "Odrzucona", className: "bg-subtle text-muted-foreground" },
  CANCELLED: { label: "Anulowana", className: "bg-subtle text-muted-foreground" },
};