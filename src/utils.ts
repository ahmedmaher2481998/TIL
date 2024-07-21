import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getInitials(name: string) {
  const [firstName, lastName] = name.split(" ")
  return firstName[0] + " " + lastName[0]
}

export function formatDisplayDate(date: string) {
  return dayjs(date).format("D-MMM YY")
}
export function formatStoreDate(date: Date) {
  return date.toISOString()
}