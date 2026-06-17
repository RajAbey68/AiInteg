import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names safely, resolving conflicts via tailwind-merge
 * and supporting conditional classes via clsx.
 *
 * @param inputs - One or more class values (strings, objects, arrays, conditionals)
 * @returns A single merged class name string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
