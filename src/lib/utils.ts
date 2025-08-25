import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ]

  let unit: Intl.RelativeTimeFormatUnit = "second"
  let value = seconds

  for (let i = 0; i < intervals.length; i++) {
    if (value < intervals[i][0]) {
      unit = intervals[i][1]
      break
    }
    value = Math.floor(value / intervals[i][0])
  }

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  return rtf.format(-value, unit)
}