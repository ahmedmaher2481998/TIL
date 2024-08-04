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


export function slugify(text: string, ampersand = 'and') {
  const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿỳýœæŕśńṕẃǵǹḿǘẍźḧ'
  const b = 'aaaaeeeeiiiioooouuuuncsyyyoarsnpwgnmuxzh'
  const p = new RegExp(a.split('').join('|'), 'g')

  return text.toString().toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(p, c =>
      b.charAt(a.indexOf(c)))
    .replace(/&/g, `-${ampersand}-`)
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}


export function getImageUploadPath({ img, str, type }: { img: File, str: string, type: "cover" | "avatar" }) {
  if (type === "cover") return `blogs/covers/${str}-${Date.now()}-${slugify(img?.name)}`
  if (type === "avatar") return `avatars/${str}-${Date.now()}-${slugify(img?.name)}`
}
