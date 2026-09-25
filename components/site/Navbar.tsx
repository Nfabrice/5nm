"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { contact, navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ButtonLink } from "../ui/Button";
import { Wordmark } from "./Wordmark";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Light text while floating over the hero or when the menu is open.
  const light = !scrolled || open;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color,backdrop-filter] duration-500 ease-editorial",
          scrolled && !open
            ? "border-b border-line/80 bg-paper/85 text-ink backdrop-blur-md"
            : "border-b border-transparent text-white",
        )}
      >
        <nav
          aria-label="Main"
          className={cn(
            "container-page flex items-center justify-between transition-[height] duration-500 ease-editorial",
            scrolled ? "h-16" : "h-20 md:h-24",
          )}
        >
          <a href="#top" aria-label="5N&M Apartments, back to top" onClick={() => setOpen(false)}>
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-[13px] font-medium tracking-[0.02em]"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-editorial group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ButtonLink
              href="#book"
              size="sm"
              variant={light ? "ghost-light" : "solid"}
              className={cn("transition-opacity duration-300", open && "pointer-events-none opacity-0")}
            >
              Book a stay
            </ButtonLink>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="relative -mr-2 grid size-11 place-items-center md:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-6 bg-current transition-transform duration-500 ease-editorial",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-6 bg-current transition-transform duration-500 ease-editorial",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink text-paper md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-center pt-20">
              <ul className="space-y-2">
                {navLinks.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-2 font-display text-5xl font-light"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
                    >
                      <span className="eyebrow text-white/40">0{i + 1}</span>
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-12"
              >
                <ButtonLink href="#book" variant="inverse" size="lg" arrow="right" className="w-full" onClick={() => setOpen(false)}>
                  Book a stay
                </ButtonLink>
              </motion.div>
            </nav>
            <div className="container-page flex justify-between pb-8 text-xs text-white/50">
              <span>{contact.location}</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
