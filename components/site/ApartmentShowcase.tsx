"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Car, CookingPot, Laptop, Sofa, WashingMachine, Wifi, type LucideIcon } from "lucide-react";
import { amenityLabels, apartments, type Amenity } from "@/lib/data";
import { cn, formatRWF } from "@/lib/utils";
import { useBooking } from "../booking/BookingProvider";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionIntro";
import { SmartImage } from "../ui/SmartImage";

const EASE = [0.22, 1, 0.36, 1] as const;

const amenityIcons: Record<Amenity, LucideIcon> = {
  furnished: Sofa,
  wifi: Wifi,
  kitchen: CookingPot,
  parking: Car,
  workspace: Laptop,
  laundry: WashingMachine,
};

/** Detailed view of the selected apartment. Switch between homes with the index tabs. */
export function ApartmentShowcase() {
  const { apartment, selectApartment, openDrawer } = useBooking();
  const [main, ...rest] = apartment.gallery;

  return (
    <section id="residence" className="bg-white py-24 md:py-36">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionLabel index="02">The residence</SectionLabel>
          <div role="tablist" aria-label="Choose an apartment" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto">
            {apartments.map((a) => {
              const active = a.id === apartment.id;
              return (
                <button
                  key={a.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectApartment(a.id)}
                  className={cn(
                    "relative shrink-0 px-3 py-2 text-[13px] transition-colors duration-300",
                    active ? "text-ink" : "text-smoke hover:text-ink",
                  )}
                >
                  <span className="tabular-nums">{a.number}</span>
                  <span className="ml-2 hidden md:inline">{a.type}</span>
                  {active && (
                    <motion.span
                      layoutId="showcase-tab"
                      className="absolute inset-x-3 -bottom-[25px] h-px bg-ink"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={apartment.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:gap-10"
          >
            {/* Gallery: snap-scroller on mobile, composed grid on desktop */}
            <div className="lg:col-span-7">
              <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:hidden">
                {apartment.gallery.map((img) => (
                  <SmartImage
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    sizes="85vw"
                    className="aspect-[4/5] w-[85%] shrink-0 snap-center"
                  />
                ))}
              </div>
              <div className="hidden h-[min(78vh,760px)] grid-cols-3 grid-rows-2 gap-3 md:grid lg:gap-4">
                <GalleryImage {...main} className="col-span-2 row-span-2" sizes="(min-width: 1024px) 40vw, 66vw" />
                {rest.map((img) => (
                  <GalleryImage key={img.src} {...img} sizes="(min-width: 1024px) 20vw, 33vw" />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-5 lg:pl-8 xl:pl-16">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow text-mute">
                  {apartment.neighbourhood}, {apartment.city}
                </p>
                <h2 className="mt-4 font-display text-[clamp(2.6rem,4.6vw,4.5rem)] font-light leading-[0.95] tracking-[-0.02em]">
                  {apartment.name}
                </h2>
                <p className="mt-6 font-display text-2xl font-light italic leading-snug text-charcoal md:text-[1.75rem]">
                  “{apartment.tagline}”
                </p>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mute">{apartment.description}</p>

                <dl className="mt-10 grid grid-cols-3 border-y border-line">
                  <Spec value={apartment.bedrooms} label={apartment.bedrooms === 1 ? "Bedroom" : "Bedrooms"} />
                  <Spec value={apartment.bathrooms} label={apartment.bathrooms === 1 ? "Bathroom" : "Bathrooms"} />
                  <Spec value={apartment.guests} label="Guests" last />
                </dl>

                <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4">
                  {apartment.amenities.map((a) => {
                    const Icon = amenityIcons[a];
                    return (
                      <li key={a} className="flex items-center gap-3 text-sm">
                        <Icon className="size-4 text-mute" strokeWidth={1.3} aria-hidden />
                        {amenityLabels[a]}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-12 flex flex-col gap-6 border-t border-ink pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="whitespace-nowrap">
                    <span className="font-display text-[2.1rem] font-light xl:text-4xl">{formatRWF(apartment.pricePerNight)}</span>
                    <span className="ml-2 text-sm text-mute">/ night</span>
                  </p>
                  <Button size="lg" arrow="right" onClick={() => openDrawer(apartment.id)}>
                    Check availability
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function GalleryImage({
  src,
  alt,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("group relative overflow-hidden", className)}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <SmartImage
        src={src}
        alt={alt}
        sizes={sizes}
        className="h-full w-full"
        imgClassName="transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.04]"
      />
    </motion.div>
  );
}

function Spec({ value, label, last }: { value: number; label: string; last?: boolean }) {
  return (
    <div className={cn("flex flex-col-reverse py-5 [&:not(:first-child)]:pl-5", !last && "border-r border-line")}>
      <dt className="mt-2 text-xs text-mute">{label}</dt>
      <dd className="font-display text-4xl font-light leading-none">{value}</dd>
    </div>
  );
}
