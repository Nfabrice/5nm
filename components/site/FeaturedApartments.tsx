import { apartments } from "@/lib/data";
import { SectionIntro } from "../ui/SectionIntro";
import { ApartmentPreview } from "./ApartmentPreview";

/**
 * Asymmetric editorial grid. Each slot sets its own column span, offset
 * and image ratio so the page reads like a magazine spread, not a card grid.
 */
const layout = [
  {
    className: "lg:col-span-7",
    aspect: "aspect-[4/5] md:aspect-[4/3]",
    sizes: "(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    className: "md:mt-32 lg:col-span-4 lg:col-start-9 lg:mt-40",
    aspect: "aspect-[4/5]",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    className: "lg:col-span-5 lg:col-start-1 lg:mt-12",
    aspect: "aspect-[4/5] md:aspect-[3/4]",
    sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    className: "md:mt-32 lg:col-span-6 lg:col-start-7 lg:mt-56",
    aspect: "aspect-[4/5] md:aspect-[4/3]",
    sizes: "(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw",
  },
];

export function FeaturedApartments() {
  return (
    <section id="apartments" className="container-page py-24 md:py-36">
      <SectionIntro index="01" label="Apartments" title={<>Find your <em className="italic">space</em></>}>
        <p>
          From a focused studio to a three-bedroom family home, 5 N&amp;M offers thoughtfully designed apartments
          across Kigali for short breaks, work trips and longer stays.
        </p>
      </SectionIntro>

      <div className="mt-16 grid gap-x-8 gap-y-20 md:mt-24 md:grid-cols-2 md:gap-x-10 lg:grid-cols-12 lg:gap-y-24">
        {apartments.map((apt, i) => (
          <ApartmentPreview
            key={apt.id}
            apartment={apt}
            className={layout[i % layout.length].className}
            aspect={layout[i % layout.length].aspect}
            sizes={layout[i % layout.length].sizes}
            delay={(i % 2) * 0.12}
          />
        ))}
      </div>
    </section>
  );
}
