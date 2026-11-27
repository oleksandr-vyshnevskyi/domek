export function toDateString(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function toLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatShortDate(date: Date) {
  return date.toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
}

export function pluralNights(count: number) {
  if (count === 1) return "noc";
  const lastTwo = count % 100;
  const last = count % 10;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return "noce";
  return "nocy";
}
export function formatBookingDate(date: Date) {
  return date.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}