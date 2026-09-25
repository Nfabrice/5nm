import { apartments, images } from "@/lib/data";
import { pad } from "@/lib/utils";
import { ImageReveal, Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionIntro";
import { SmartImage } from "../ui/SmartImage";

const nearby = ["City Centre", "Restaurants & cafés", "Business districts", "Easy access to major attractions"];

export function KigaliSection() {
  const neighbourhoods = Array.from(new Set(apartments.map((a) => a.neighbourhood)));

  return (
    <section id="location" className="py-24 md:py-36">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Imagery */}
          <div className="relative lg:col-span-7">
            <ImageReveal from="left" className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[6/7]">
              <SmartImage
                src={images.kigali.src}
                alt={images.kigali.alt}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-full w-full"
              />
            </ImageReveal>
            <div className="absolute -bottom-12 right-6 hidden w-[34%] border-[10px] border-paper bg-paper sm:block lg:-bottom-16 lg:-right-12 lg:w-[36%]">
              <ImageReveal delay={0.3} className="aspect-[3/4] w-full">
                <SmartImage
                  src={images.kigaliHills.src}
                  alt={images.kigaliHills.alt}
                  sizes="(min-width: 1024px) 22vw, 34vw"
                  className="h-full w-full"
                />
              </ImageReveal>
            </div>
            <p className="eyebrow absolute left-5 top-5 text-white mix-blend-difference">Kigali · Rwanda</p>
          </div>

          {/* Panel */}
          <div className="flex flex-col sm:pt-8 lg:col-span-4 lg:col-start-9 lg:pt-8">
            <Reveal>
              <SectionLabel index="05">Location</SectionLabel>
              <h2 className="mt-6 font-display text-[length:var(--text-headline)] font-light leading-[0.95] tracking-[-0.02em]">
                Stay in <em className="italic">Kigali</em>
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mute">
                Experience Rwanda from a space that feels like home.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-12 lg:mt-20">
              <div className="border-t border-ink pt-6">
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-3xl font-light">Kigali, Rwanda</p>
                  <p className="text-[11px] tabular-nums text-mute">1°56′ S · 30°03′ E</p>
                </div>
                <ul className="mt-6">
                  {nearby.map((item, i) => (
                    <li
                      key={item}
                      className="group flex items-center gap-5 border-b border-line py-4 text-[15px] transition-[padding] duration-500 ease-editorial hover:pl-2"
                    >
                      <span className="eyebrow w-6 text-smoke">{pad(i + 1)}</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs leading-relaxed text-mute">
                  Our homes are in {neighbourhoods.slice(0, -1).join(", ")} and {neighbourhoods.at(-1)}.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
