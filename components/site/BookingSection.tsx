import { BookingPanel } from "../booking/BookingPanel";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionIntro";

const notes = ["Short & medium-term stays", "Fully furnished homes", "Prices in RWF"];

export function BookingSection() {
  return (
    <section id="book" className="container-page py-24 md:py-36">
      <div className="grid gap-8 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <SectionLabel index="03">Booking</SectionLabel>
          <h2 className="mt-6 font-display text-[length:var(--text-headline)] font-light leading-[0.95] tracking-[-0.02em]">
            Plan your <em className="italic">stay</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
          <p className="max-w-md text-[15px] leading-relaxed text-mute">
            Choose your dates and number of guests, and we&apos;ll show you what&apos;s available across our Kigali
            apartments.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-12 md:mt-16">
        <BookingPanel />
      </Reveal>

      <Reveal delay={0.2}>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xs text-mute">
          {notes.map((n) => (
            <li key={n} className="flex items-center gap-2">
              <span aria-hidden className="size-1 rounded-full bg-ink" />
              {n}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
