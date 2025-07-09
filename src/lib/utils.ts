import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function mergeClasses(...inputs: ClassValue[]) {
  const conditionalClasses = clsx(inputs);
  const mergedClasses = twMerge(conditionalClasses);
  return mergedClasses;
}
