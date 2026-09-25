import { cn } from "@/lib/utils";

/** Typographic wordmark: "5 N&M" with an italic ampersand. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[26px] leading-none tracking-[-0.01em]", className)}>
      5&nbsp;N<em className="px-[0.04em] font-light italic">&amp;</em>M
    </span>
  );
}
