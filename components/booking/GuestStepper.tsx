"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_GUESTS } from "@/lib/data";

export function GuestStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div>
        <p className="text-sm font-medium">Guests</p>
        <p className="mt-0.5 text-xs text-mute">Up to {MAX_GUESTS} per apartment</p>
      </div>
      <div className="flex items-center gap-4">
        <StepButton label="Remove a guest" disabled={value <= 1} onClick={() => onChange(value - 1)}>
          <Minus className="size-3.5" strokeWidth={1.5} />
        </StepButton>
        <span className="w-5 text-center text-sm tabular-nums" aria-live="polite">
          {value}
        </span>
        <StepButton label="Add a guest" disabled={value >= MAX_GUESTS} onClick={() => onChange(value + 1)}>
          <Plus className="size-3.5" strokeWidth={1.5} />
        </StepButton>
      </div>
    </div>
  );
}

function StepButton({
  children,
  label,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid size-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line"
      {...props}
    >
      {children}
    </button>
  );
}

export const guestLabel = (n: number) => `${n} ${n === 1 ? "Guest" : "Guests"}`;
