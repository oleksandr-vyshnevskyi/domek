import { getListingById } from "@/lib/data/listings";
import { getBookedRanges } from "@/lib/data/bookings";

function toDateString(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    return Response.json({ error: "Nie znaleziono ogłoszenia." }, { status: 404 });
  }

  const ranges = await getBookedRanges(listing.id);

  return Response.json({
    booked: ranges.map((range) => ({
      from: toDateString(range.startDate),
      to: toDateString(range.endDate),
    })),
  });
}