"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatShort } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingProvider";
import { GuestStepper, guestLabel } from "./GuestStepper";
import { RangeCalendar } from "./RangeCalendar";

type Field = "dates" | "guests" | null;

/**
 * The "Plan your stay" search bar. Horizontal on desktop, stacked on
 * mobile. Opens the availability drawer once dates are chosen.
 */
export function BookingPanel({ className }: { className?: string }) {
  const { checkIn, checkOut, guests, setDates, setGuests, openDrawer } = useBooking();
  const [active, setActive] = useState<Field>(null);
  const [needsDates, setNeedsDates] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setActive(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  function toggle(field: Exclude<Field, null>) {
    setActive((cur) => (cur === field ? null : field));
  }

  function submit() {
    if (!checkIn || !checkOut) {
      setNeedsDates(true);
      setActive("dates");
      return;
    }
    setActive(null);
    openDrawer();
  }

  const popover = (
    <AnimatePresence>
      {active && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "z-20 border border-line bg-white p-5 sm:p-7",
            "lg:absolute lg:top-[calc(100%+10px)]",
            active === "dates" ? "lg:left-[25%] lg:w-[640px]" : "lg:right-[22%] lg:w-[360px]",
          )}
        >
          {active === "dates" ? (
            <>
              {needsDates && !(checkIn && checkOut) && (
                <p className="mb-4 text-xs text-mute">Choose your check-in and check-out dates to see availability.</p>
              )}
              <RangeCalendar
                start={checkIn}
                end={checkOut}
                onChange={(a, b) => {
                  setDates(a, b);
                  if (a && b) {
                    setNeedsDates(false);
                    setTimeout(() => setActive(null), 250);
                  }
                }}
              />
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-mute">
                <span>{checkIn && !checkOut ? "Now select your check-out date" : "Minimum stay: 1 night"}</span>
                {(checkIn || checkOut) && (
                  <button type="button" onClick={() => setDates(null, null)} className="underline underline-offset-4 hover:text-ink">
                    Clear dates
                  </button>
                )}
              </div>
            </>
          ) : (
            <GuestStepper value={guests} onChange={setGuests} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div className="grid border border-line bg-white lg:grid-cols-[1.1fr_1fr_1fr_1fr_auto]">
        <FieldShell label="Location">
          <span className="flex items-center gap-2">
            <MapPin className="size-3.5 text-mute" strokeWidth={1.5} aria-hidden />
            Kigali, Rwanda
          </span>
        </FieldShell>

        <FieldButton
          label="Check-in"
          value={checkIn ? formatShort(checkIn) : "Select date"}
          muted={!checkIn}
          active={active === "dates"}
          attention={needsDates && !checkIn}
          onClick={() => toggle("dates")}
        />
        <FieldButton
          label="Check-out"
          value={checkOut ? formatShort(checkOut) : "Select date"}
          muted={!checkOut}
          active={active === "dates"}
          attention={needsDates && !checkOut}
          onClick={() => toggle("dates")}
        />

        {/* On mobile the popover opens directly under the date fields */}
        <div className="lg:hidden">{active === "dates" && popover}</div>

        <FieldButton
          label="Guests"
          value={guestLabel(guests)}
          active={active === "guests"}
          onClick={() => toggle("guests")}
        />

        <div className="lg:hidden">{active === "guests" && popover}</div>

        <button
          type="button"
          onClick={submit}
          className="group/cta flex h-16 items-center justify-center gap-3 bg-ink px-8 text-sm font-medium text-paper transition-colors duration-300 hover:bg-charcoal lg:h-auto lg:min-w-[220px]"
        >
          Check availability
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" strokeWidth={1.4} />
        </button>
      </div>

      <div className="hidden lg:block">{popover}</div>
    </div>
  );
}

function FieldShell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line px-6 py-5 lg:border-r lg:border-b-0 lg:py-6">
      <p className="eyebrow text-mute">{label}</p>
      <div className="mt-2 text-[15px]">{children}</div>
    </div>
  );
}

function FieldButton({
  label,
  value,
  muted,
  active,
  attention,
  onClick,
}: {
  label: string;
  value: string;
  muted?: boolean;
  active?: boolean;
  attention?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      className={cn(
        "relative border-b border-line px-6 py-5 text-left transition-colors duration-300 hover:bg-paper lg:border-r lg:border-b-0 lg:py-6",
        active && "bg-paper",
      )}
    >
      <span className={cn("eyebrow block", attention ? "text-ink" : "text-mute")}>{label}</span>
      <span className={cn("mt-2 block text-[15px]", muted && "text-smoke")}>{value}</span>
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-6 bottom-0 h-px origin-left bg-ink transition-transform duration-500 ease-editorial",
          active || attention ? "scale-x-100" : "scale-x-0",
        )}
      />
    </button>
  );
}
