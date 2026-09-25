import { cn } from "@/lib/utils";

/** Typographic wordmark: "5N&M Apartments" with an italic ampersand. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-[0.3em] font-display text-[26px] leading-none tracking-[-0.01em]", className)}>
      <span>
        5N<em className="px-[0.04em] font-light italic">&amp;</em>M
      </span>
      <span className="font-light italic text-[0.62em]">Apartments</span>
    </span>
  );
}
