import { ArrowRight, ArrowUpRight } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "inverse" | "ghost-light" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 whitespace-nowrap font-sans font-medium tracking-[0.01em] transition-[background-color,color,border-color,transform] duration-300 ease-editorial select-none disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper hover:bg-charcoal hover:-translate-y-px",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-paper hover:-translate-y-px",
  inverse: "bg-paper text-ink hover:bg-white hover:-translate-y-px",
  "ghost-light":
    "border border-white/50 text-white backdrop-blur-[2px] hover:border-white hover:bg-white hover:text-ink hover:-translate-y-px",
  link: "px-0 text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-current after:transition-transform after:duration-500 after:ease-editorial hover:after:scale-x-[0.35]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[13px]",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-[15px]",
};

type Common = {
  variant?: Variant;
  size?: Size;
  arrow?: "right" | "up-right" | false;
};

function Arrow({ kind }: { kind: "right" | "up-right" }) {
  const Icon = kind === "right" ? ArrowRight : ArrowUpRight;
  return (
    <Icon
      aria-hidden
      strokeWidth={1.4}
      className="size-4 shrink-0 transition-transform duration-300 ease-editorial group-hover/btn:translate-x-1"
    />
  );
}

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], variant !== "link" && sizes[size], variant === "link" && "h-auto text-sm", className);
}

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & Common
>(function Button({ variant = "solid", size = "md", arrow = false, className, children, type = "button", ...props }, ref) {
  return (
    <button ref={ref} type={type} className={classes(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow kind={arrow} />}
    </button>
  );
});

export function ButtonLink({
  variant = "solid",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & Common) {
  return (
    <a className={classes(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow kind={arrow} />}
    </a>
  );
}
