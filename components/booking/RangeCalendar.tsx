"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import {
  WEEKDAYS,
  addMonths,
  formatMonth,
  isSameDay,
  monthGrid,
  startOfDay,
} from "@/lib/dates";
import { cn } from "@/lib/utils";

type Props = {
  start: Date | null;
  end: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
  /** Number of months shown side by side (1 on mobile, 2 on desktop). */
  months?: 1 | 2;
  className?: string;
};

/** Minimal date-range picker. Past dates are disabled. */
export function RangeCalendar({ start, end, onChange, months = 2, className }: Props) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [view, setView] = useState(() => new Date((start ?? today).getFullYear(), (start ?? today).getMonth(), 1));
  const [hover, setHover] = useState<Date | null>(null);

  const canGoBack = view > new Date(today.getFullYear(), today.getMonth(), 1);

  function pick(day: Date) {
    if (!start || (start && end)) return onChange(day, null);
    if (day <= start) return onChange(day, null);
    onChange(start, day);
  }

  const rangeEnd = end ?? (start && hover && hover > start ? hover : null);

  return (
    <div className={cn("select-none", className)}>
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          disabled={!canGoBack}
          onClick={() => setView((v) => addMonths(v, -1))}
          className="grid size-9 place-items-center text-ink transition-opacity hover:opacity-60 disabled:opacity-20"
        >
          <ChevronLeft className="size-4" strokeWidth={1.4} />
        </button>
        <div className="flex flex-1 justify-around">
          {Array.from({ length: months }, (_, i) => (
            <p key={i} className={cn("eyebrow text-ink", i > 0 && "hidden sm:block")}>
              {formatMonth(addMonths(view, i))}
            </p>
          ))}
        </div>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setView((v) => addMonths(v, 1))}
          className="grid size-9 place-items-center text-ink transition-opacity hover:opacity-60"
        >
          <ChevronRight className="size-4" strokeWidth={1.4} />
        </button>
      </div>

      <div className={cn("mt-4 grid gap-8", months === 2 && "sm:grid-cols-2")}>
        {Array.from({ length: months }, (_, i) => {
          const month = addMonths(view, i);
          return (
            <div key={month.toISOString()} className={cn(i > 0 && "hidden sm:block")}>
              <div className="grid grid-cols-7 text-center text-[11px] font-medium text-smoke">
                {WEEKDAYS.map((d) => (
                  <span key={d} className="py-2">
                    {d}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-7" onMouseLeave={() => setHover(null)}>
                {monthGrid(month).map((day, idx) => {
                  if (!day) return <span key={`b${idx}`} />;
                  const disabled = day < today;
                  const isStart = isSameDay(day, start);
                  const isEnd = isSameDay(day, rangeEnd);
                  const inRange = !!start && !!rangeEnd && day > start && day < rangeEnd;
                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      disabled={disabled}
                      onClick={() => pick(day)}
                      onMouseEnter={() => setHover(day)}
                      aria-pressed={isStart || isEnd}
                      aria-label={day.toDateString()}
                      className={cn(
                        "relative h-10 text-[13px] tabular-nums transition-colors duration-200",
                        disabled && "text-line line-through decoration-line",
                        !disabled && !isStart && !isEnd && "hover:bg-bone",
                        inRange && "bg-bone",
                        (isStart || isEnd) && "bg-ink text-paper",
                        isSameDay(day, today) && !isStart && !isEnd && "font-semibold underline underline-offset-4",
                      )}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
