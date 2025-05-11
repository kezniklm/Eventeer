import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const firstLetterUppercase = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
