import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const rwf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** 85000 -> "85,000 RWF" */
export function formatRWF(amount: number) {
  return `${rwf.format(amount)} RWF`;
}

export function unsplash(id: string) {
  return `https://images.unsplash.com/${id}`;
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}
