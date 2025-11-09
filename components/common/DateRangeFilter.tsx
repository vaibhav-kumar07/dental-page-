"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function DateRangeFilter({ className ,buttonClassName }: { className?: string ,buttonClassName?:string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    if (fromParam && toParam) {
      return { from: new Date(fromParam), to: new Date(toParam) };
    }
    return undefined;
  });

  const [open, setOpen] = React.useState(false);

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    const params = new URLSearchParams(searchParams.toString());

    if (range?.from) params.set("from", format(range.from, "yyyy-MM-dd"));
    else params.delete("from");

    if (range?.to) params.set("to", format(range.to, "yyyy-MM-dd"));
    else params.delete("to");

    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  const handleClear = () => {
    setDate(undefined);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("from");
    params.delete("to");
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
    setOpen(false);
  };

  const label = date?.from
    ? date.to
      ? `${format(date.from, "MMM d, yyyy")} - ${format(date.to, "MMM d, yyyy")}`
      : format(date.from, "MMM d, yyyy")
    : "Select date range";

  return (
    <div className={cn("relative inline-flex items-center gap-1", className)}>
      {/* Main Button */}
      <Button
        variant="outline"
        onClick={() => setOpen((prev) => !prev)}
        className={cn("w-[240px] justify-start text-left font-normal", buttonClassName)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span>{label}</span>
      </Button>

      {/* Separate Clear Button */}
      {date?.from && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="h-9 w-9 text-gray-600 hover:text-gray-800"
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {/* Manual Popover */}
      {open && (
        <div
          className="absolute top-11 z-50 rounded-xl border bg-white shadow-lg p-3"
          onMouseLeave={() => setOpen(false)}
        >
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
        </div>
      )}
    </div>
  );
}
