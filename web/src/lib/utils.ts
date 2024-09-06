import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateToYYYYMMDD(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export function setHeaderTitle(title: string) {
  let t: string
  if (!title) {
    t = '图书预约系统'
  }
  else {
    t = `${title} - 图书预约系统`
  }

  document.title = t
}
