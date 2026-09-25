"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { apartments, type Apartment } from "@/lib/data";

type BookingState = {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  /** Apartment shown in the showcase and used for availability checks. */
  apartment: Apartment;
  drawerOpen: boolean;
  setDates: (checkIn: Date | null, checkOut: Date | null) => void;
  setGuests: (n: number) => void;
  selectApartment: (id: string, opts?: { scroll?: boolean }) => void;
  openDrawer: (apartmentId?: string) => void;
  closeDrawer: () => void;
};

const BookingContext = createContext<BookingState | null>(null);

/**
 * Frontend-only booking state for the prototype.
 * When a real booking API exists, replace `openDrawer`'s mock check
 * (see AvailabilityDrawer) with a request and keep this shape.
 */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [apartmentId, setApartmentId] = useState(apartments[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const setDates = useCallback((a: Date | null, b: Date | null) => {
    setCheckIn(a);
    setCheckOut(b);
  }, []);

  const selectApartment = useCallback((id: string, opts?: { scroll?: boolean }) => {
    setApartmentId(id);
    if (opts?.scroll) {
      document.getElementById("residence")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const openDrawer = useCallback((id?: string) => {
    if (id) setApartmentId(id);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<BookingState>(
    () => ({
      checkIn,
      checkOut,
      guests,
      apartment: apartments.find((a) => a.id === apartmentId) ?? apartments[0],
      drawerOpen,
      setDates,
      setGuests,
      selectApartment,
      openDrawer,
      closeDrawer,
    }),
    [checkIn, checkOut, guests, apartmentId, drawerOpen, setDates, selectApartment, openDrawer, closeDrawer],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
