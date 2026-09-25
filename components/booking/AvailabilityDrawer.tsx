"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { apartments } from "@/lib/data";
import { formatShort, nightsBetween } from "@/lib/dates";
import { cn, formatRWF } from "@/lib/utils";
import { Button } from "../ui/Button";
import { SmartImage } from "../ui/SmartImage";
import { useBooking } from "./BookingProvider";
import { GuestStepper, guestLabel } from "./GuestStepper";
import { RangeCalendar } from "./RangeCalendar";

type Step = "dates" | "checking" | "result" | "confirm";
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Side drawer (full-screen sheet on mobile) that shows a *fictional*
 * availability result. No reservation or payment happens here.
 */
export function AvailabilityDrawer() {
  const { drawerOpen, closeDrawer } = useBooking();

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeDrawer}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-[520px] flex-col bg-paper"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <DrawerBody />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function DrawerBody() {
  const { checkIn, checkOut, guests, apartment, setDates, setGuests, closeDrawer } = useBooking();
  const [step, setStep] = useState<Step>(checkIn && checkOut ? "checking" : "dates");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => closeRef.current?.focus(), []);

  // Mock availability check. Replace with a real API call later.
  useEffect(() => {
    if (step !== "checking") return;
    const t = setTimeout(() => setStep("result"), 1100);
    return () => clearTimeout(t);
  }, [step]);

  const fits = guests <= apartment.guests;
  const match = fits ? apartment : apartments.find((a) => a.guests >= guests) ?? apartment;
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const total = nights * match.pricePerNight;

  return (
    <>
      <header className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-10">
        <div className="flex items-center gap-4">
          {(step === "result" || step === "confirm") && (
            <button
              type="button"
              aria-label="Back"
              onClick={() => setStep(step === "confirm" ? "result" : "dates")}
              className="-ml-2 grid size-9 place-items-center transition-opacity hover:opacity-60"
            >
              <ArrowLeft className="size-4" strokeWidth={1.4} />
            </button>
          )}
          <p className="eyebrow text-mute">
            {step === "dates" && "Plan your stay"}
            {step === "checking" && "Checking availability"}
            {step === "result" && "Availability"}
            {step === "confirm" && "Booking preview"}
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={closeDrawer}
          className="-mr-2 grid size-10 place-items-center transition-transform duration-300 hover:rotate-90"
        >
          <X className="size-5" strokeWidth={1.2} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {step === "dates" && (
              <div>
                <h3 id="drawer-title" className="font-display text-4xl font-light leading-none sm:text-5xl">
                  When are you staying?
                </h3>
                <p className="mt-3 text-sm text-mute">{apartment.name} · {apartment.neighbourhood}, Kigali</p>
                <RangeCalendar className="mt-8" months={1} start={checkIn} end={checkOut} onChange={setDates} />
                <div className="mt-8 border-t border-line pt-6">
                  <GuestStepper value={guests} onChange={setGuests} />
                </div>
              </div>
            )}

            {step === "checking" && (
              <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
                <span className="relative block h-px w-40 overflow-hidden bg-line">
                  <motion.span
                    className="absolute inset-y-0 left-0 w-1/3 bg-ink"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
                  />
                </span>
                <p id="drawer-title" className="mt-6 font-display text-3xl font-light">
                  Checking your dates
                </p>
                <p className="mt-2 text-sm text-mute">
                  {checkIn && checkOut && `${formatShort(checkIn)} – ${formatShort(checkOut)}`}
                </p>
              </div>
            )}

            {step === "result" && checkIn && checkOut && (
              <div>
                <p className="eyebrow flex items-center gap-2 text-ink">
                  <span className="grid size-5 place-items-center rounded-full bg-ink text-paper">
                    <Check className="size-3" strokeWidth={2} />
                  </span>
                  Available
                </p>
                <h3 id="drawer-title" className="mt-5 font-display text-4xl font-light leading-none sm:text-5xl">
                  {match.name}
                </h3>
                {!fits && (
                  <p className="mt-3 text-sm text-mute">
                    {apartment.name} sleeps {apartment.guests}. This home fits {guestLabel(guests).toLowerCase()}.
                  </p>
                )}
                <SmartImage
                  src={match.cover.src}
                  alt={match.cover.alt}
                  sizes="(min-width: 640px) 440px, 100vw"
                  className="mt-7 aspect-[16/10] w-full"
                />
                <dl className="mt-7 divide-y divide-line border-y border-line text-sm">
                  <Row label="Location" value={`${match.neighbourhood}, Kigali`} />
                  <Row label="Dates" value={`${formatShort(checkIn)} – ${formatShort(checkOut)}`} />
                  <Row label="Guests" value={guestLabel(guests)} />
                  <Row label="Rate" value={`${formatRWF(match.pricePerNight)} / night`} />
                  <Row
                    label={`${nights} ${nights === 1 ? "night" : "nights"}`}
                    value={formatRWF(total)}
                    strong
                  />
                </dl>
                <p className="mt-3 text-xs text-smoke">Estimated total. Final price confirmed at booking.</p>
              </div>
            )}

            {step === "confirm" && (
              <div className="flex min-h-[50vh] flex-col justify-center">
                <p className="eyebrow text-mute">Almost there</p>
                <h3 id="drawer-title" className="mt-5 font-display text-4xl font-light leading-[1.02] sm:text-5xl">
                  Online booking is <em className="italic">coming soon.</em>
                </h3>
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mute">
                  This is a preview of the 5 N&amp;M booking experience. Your dates have not been reserved and no
                  payment was taken. To book {match.name} today, reach us directly.
                </p>
                <div className="mt-8 space-y-2 text-sm">
                  <a className="block underline underline-offset-4 hover:opacity-60" href="mailto:hello@5nm.rw">
                    hello@5nm.rw
                  </a>
                  <p className="text-mute">+250 XXX XXX XXX</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className={cn("border-t border-line px-6 py-5 sm:px-10", step === "checking" && "invisible")}>
        {step === "dates" && (
          <Button
            className="w-full"
            size="lg"
            arrow="right"
            disabled={!checkIn || !checkOut}
            onClick={() => setStep("checking")}
          >
            {checkIn && !checkOut ? "Select check-out" : "Check availability"}
          </Button>
        )}
        {step === "result" && (
          <Button className="w-full" size="lg" arrow="right" onClick={() => setStep("confirm")}>
            Continue booking
          </Button>
        )}
        {(step === "confirm" || step === "checking") && (
          <Button className="w-full" size="lg" variant="outline" onClick={closeDrawer}>
            Back to apartments
          </Button>
        )}
      </footer>
    </>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3.5">
      <dt className={strong ? "font-medium text-ink" : "text-mute"}>{label}</dt>
      <dd className={cn("text-right", strong ? "font-display text-2xl" : "text-ink")}>{value}</dd>
    </div>
  );
}
