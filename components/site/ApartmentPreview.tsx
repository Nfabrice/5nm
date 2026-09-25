"use client";

import { ArrowRight } from "lucide-react";
import type { Apartment } from "@/lib/data";
import { cn, formatRWF } from "@/lib/utils";
import { useBooking } from "../booking/BookingProvider";
import { ImageReveal, Reveal } from "../ui/Reveal";
import { SmartImage } from "../ui/SmartImage";

/** Editorial listing: large image, name, key facts, price and a CTA. */
export function ApartmentPreview({
  apartment,
  aspect = "aspect-[4/5]",
  sizes,
  className,
  delay = 0,
}: {
  apartment: Apartment;
  aspect?: string;
  sizes: string;
  className?: string;
  delay?: number;
}) {
  const { selectApartment } = useBooking();
  const view = () => selectApartment(apartment.id, { scroll: true });
  const beds = apartment.bedrooms === 1 ? "1 Bedroom" : `${apartment.bedrooms} Bedrooms`;

  return (
    <article className={cn("group", className)}>
      <button
        type="button"
        onClick={view}
        aria-label={`View ${apartment.name}`}
        className="block w-full cursor-pointer text-left"
      >
        <ImageReveal delay={delay} className={cn("w-full", aspect)}>
          <SmartImage
            src={apartment.cover.src}
            alt={apartment.cover.alt}
            sizes={sizes}
            className="h-full w-full"
            imgClassName="transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.045]"
          />
          <span className="eyebrow pointer-events-none absolute left-5 top-5 text-white mix-blend-difference">
            {apartment.number} / {apartment.type}
          </span>
        </ImageReveal>
      </button>

      <Reveal delay={delay + 0.15} className="mt-6 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h3 className="font-display text-[2rem] font-light leading-none tracking-[-0.01em] xl:text-[2.4rem]">
            {apartment.name}
          </h3>
          <p className="mt-3 text-[13px] text-mute">
            {apartment.neighbourhood}, {apartment.city}
            <Dot />
            {beds}
            <Dot />
            {apartment.guests} Guests
          </p>
          <p className="mt-4 text-sm">
            <span className="text-mute">From </span>
            <span className="font-semibold">{formatRWF(apartment.pricePerNight)}</span>
            <span className="text-mute"> / night</span>
          </p>
        </div>
        <button
          type="button"
          onClick={view}
          className="group/cta inline-flex items-center gap-3 self-start border-b border-ink pb-1 text-[13px] font-medium transition-[gap] duration-300 hover:gap-4 xl:self-auto"
        >
          View apartment
          <ArrowRight className="size-4" strokeWidth={1.4} />
        </button>
      </Reveal>
    </article>
  );
}

function Dot() {
  return <span aria-hidden className="mx-2 inline-block text-smoke">·</span>;
}
