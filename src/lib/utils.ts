import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  // Create options object for date formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the date
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}

export const styleSystolic = {
  borderColor: "rgb(230, 111, 210)",
  backgroundColor: "rgba(230, 111, 210)",
  tension: 0.4,
  pointBorderWidth: 2,
  pointBorderColor: "rgba(255,255,255)",
  pointRadius: 7,
  borderWidth: 2,
};

export const styleDiastolic = {
  borderColor: "rgb(140, 111, 230)",
  backgroundColor: "rgba(140, 111, 230)",
  tension: 0.4,
  pointBorderWidth: 2,
  pointBorderColor: "rgba(255,255,255)",
  pointRadius: 7,
  borderWidth: 2,
};

export function average(arr: number[]) {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return Math.floor(sum / arr.length);
}

export function getLabels(arr: any[]) {
  return arr.map((item) => `${item.month.slice(0, 3)}, ${item.year}`).reverse();
}
