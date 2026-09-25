"use client";

import { MotionConfig } from "framer-motion";
import { BookingProvider } from "./booking/BookingProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <BookingProvider>{children}</BookingProvider>
    </MotionConfig>
  );
}
