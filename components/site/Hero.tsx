"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "@/lib/data";
import { ButtonLink } from "../ui/Button";
import { MaskLine } from "../ui/Reveal";
import { SmartImage } from "../ui/SmartImage";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex h-[100svh] min-h-[640px] flex-col overflow-hidden bg-ink text-white"
    >
      {/* Background photograph */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <SmartImage
            src={images.hero.src}
            alt={images.hero.alt}
            priority
            quality={80}
            tone="dark"
            className="h-full w-full"
          />
        </motion.div>
      </motion.div>
      {/* Scrim for legibility: photography stays the hero */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/30" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/40 to-transparent"
      />

      {/* Floating inset image — desktop composition */}
      <motion.figure
        className="absolute right-[4rem] top-[22%] hidden w-[200px] xl:block 2xl:w-[240px]"
        style={{ opacity: fade }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1.1 }}
        >
          <SmartImage
            src={images.heroInset.src}
            alt={images.heroInset.alt}
            sizes="240px"
            tone="dark"
            className="aspect-[4/5] w-full"
          />
          <figcaption className="mt-3 flex justify-between text-[11px] text-white/70">
            <span>Residence 01</span>
            <span>Gikondo</span>
          </figcaption>
        </motion.div>
      </motion.figure>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-page mt-auto pb-8 md:pb-12"
      >
        <motion.p
          className="eyebrow flex items-center gap-4 text-white/80"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        >
          <span aria-hidden className="h-px w-10 bg-white/60" />
          Live beautifully in Rwanda
        </motion.p>

        <div className="mt-6 grid items-end gap-10 lg:grid-cols-12">
          <h1 className="font-display text-[16vw] sm:text-[length:var(--text-display)] font-light leading-[0.88] tracking-[-0.035em] lg:col-span-8">
            <MaskLine delay={0.6}>A better way</MaskLine>
            <MaskLine delay={0.72}>
              to <em className="italic">stay.</em>
            </MaskLine>
          </h1>

          <motion.div
            className="lg:col-span-4 lg:pb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
          >
            <p className="max-w-sm text-[15px] leading-relaxed text-white/85 md:text-base">
              Thoughtfully designed apartments for comfortable stays in Rwanda.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="#apartments"
                variant="inverse"
                size="lg"
                arrow="right"
              >
                Explore apartments
              </ButtonLink>
              <ButtonLink href="#book" variant="ghost-light" size="lg">
                Book a stay
              </ButtonLink>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 flex items-center justify-between border-t border-white/20 pt-5 text-[12px] text-white/75 md:mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <p className="flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 [animation-duration:2.4s]" />
              <span className="relative inline-flex size-2 rounded-full bg-white" />
            </span>
            <span className="font-medium text-white">Kigali, Rwanda</span>
            <span className="hidden sm:inline">KK 706 St</span>
          </p>
          <a href="#apartments" className="group flex items-center gap-3">
            <span className="hidden sm:inline">Scroll to explore</span>
            <span
              aria-hidden
              className="relative block h-8 w-px overflow-hidden bg-white/25"
            >
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-white" />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
