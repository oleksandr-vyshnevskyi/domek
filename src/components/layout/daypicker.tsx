"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import { SetStateAction, useState } from "react";
import { addDays, format, startOfMonth } from "date-fns";
import { DateRange, DayPicker } from "@daypicker/react";

export default function dayPicker() {
   const [range, setRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: addDays(startOfMonth(new Date()), 4),
  });

  let footer = `Please pick the first day.`;
  if (range?.from) {
    if (!range.to) {
      footer = `${format(range.from, "PPP")}—`;
    } else if (range.to) {
      footer = `${format(range.from, "PPP")}—${format(range.to, "PPP")}`;
    }
  }
  return (
    <DayPicker mode="range"
      selected={range}
      onSelect={setRange}
      footer={footer}
    disabled={{ before: new Date() }} required />
  );
}
