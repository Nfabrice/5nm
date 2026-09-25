import { images, principles } from "@/lib/data";
import { pad } from "@/lib/utils";
import { ImageReveal, Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionIntro";
import { SmartImage } from "../ui/SmartImage";

export function WhySection() {
  return (
    <section id="about" className="border-t border-line bg-white py-24 md:py-36">
      <div className="container-page">
        <Reveal>
          <SectionLabel index="04">Why 5 N&amp;M</SectionLabel>
          <h2 className="mt-8 max-w-[14ch] font-display text-[clamp(3rem,8vw,8rem)] font-light leading-[0.9] tracking-[-0.03em]">
            More than a place to <em className="italic">stay.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <ImageReveal className="aspect-[4/5] w-full lg:sticky lg:top-28">
              <SmartImage
                src={images.about.src}
                alt={images.about.alt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full"
              />
            </ImageReveal>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 0.06}
                className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-10 last:border-b md:grid-cols-[5rem_1fr] md:py-12"
              >
                <span className="eyebrow pt-3 text-mute">{pad(i + 1)}</span>
                <div>
                  <h3 className="font-display text-[clamp(2rem,3.4vw,3rem)] font-light leading-none tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mute">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
