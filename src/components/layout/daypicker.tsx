"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { addDays, format, startOfMonth } from "date-fns";
import { DateRange, DayPicker , getDefaultClassNames} from "@daypicker/react";

export default function dayPicker() {
    const defaultClassNames = getDefaultClassNames();
   const [range, setRange] = useState<DateRange>();

  let footer = `Please pick the first day.`;
  if (range?.from) {
    if (!range.to) {
      footer = `${format(range.from, "PPP")}—`;
    } else if (range.to) {
      footer = `${format(range.from, "PPP")}—${format(range.to, "PPP")}`;
    }
  }
  return (
    <DayPicker 
    classNames={{
        today: `border-amber-500`, 
        selected: `bg-amber-500 border-amber-500 text-white`, 
        root: `${defaultClassNames.root} shadow-lg p-5`, 
        chevron: `${defaultClassNames.chevron} fill-amber-500`,
       disabled: "opacity-50"
      }}
    mode="range"
      selected={range}
      onSelect={setRange}
      footer={footer}
    disabled={{ before: new Date() }} resetOnSelect  />
  );
}
