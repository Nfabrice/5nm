import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Small indexed label, e.g. "(01) Apartments". */
export function SectionLabel({
  index,
  children,
  className,
  light = false,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", light ? "text-white/60" : "text-mute", className)}>
      <span className={light ? "text-white" : "text-ink"}>({index})</span>
      <span aria-hidden className={cn("h-px w-8", light ? "bg-white/30" : "bg-line")} />
      {children}
    </p>
  );
}

/** Two-column section heading: label + big serif title, with optional supporting copy. */
export function SectionIntro({
  index,
  label,
  title,
  children,
  className,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 md:grid-cols-12 md:gap-10", className)}>
      <Reveal className="md:col-span-7">
        <SectionLabel index={index}>{label}</SectionLabel>
        <h2 className="mt-6 font-display text-[length:var(--text-headline)] font-light leading-[0.95] tracking-[-0.02em]">
          {title}
        </h2>
      </Reveal>
      {children && (
        <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
          <div className="max-w-md text-[15px] leading-relaxed text-mute">{children}</div>
        </Reveal>
      )}
    </div>
  );
}
