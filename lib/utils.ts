import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDropCountdown(targetDate: string): { days: string; hours: string; mins: string; secs: string } {
  const diff = Math.max(0, new Date(targetDate).getTime() - new Date().getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
  const mins = Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, "0");
  const secs = Math.floor((diff / 1000) % 60).toString().padStart(2, "0");
  return { days, hours, mins, secs };
}
