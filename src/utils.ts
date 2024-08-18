import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'
import { h } from 'vue'
import { useToast, ToastAction } from '@/components'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  if (!name) return ''
  const [firstName, lastName] = name.split(' ')
  return firstName[0] + ' ' + lastName[0]
}

export function formatDisplayDate(date: string) {
  return dayjs(date).format('D-MMM YY')
}
export function formatStoreDate(date: Date) {
  return date.toISOString()
}

export function slugify(text: string, ampersand = 'and') {
  const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿỳýœæŕśńṕẃǵǹḿǘẍźḧ'
  const b = 'aaaaeeeeiiiioooouuuuncsyyyoarsnpwgnmuxzh'
  const p = new RegExp(a.split('').join('|'), 'g')

  return text
    .toString()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, `-${ampersand}-`)
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}
const { toast } = useToast()
type toastParams = {
  title: string
  description: string
}
export const notify = {
  success: (t: toastParams) =>
    toast({
      title: `Success: ${t.title}`,
      description: t.description,
      variant: 'default',
      action: h(
        ToastAction,
        {
          altText: 'Try again'
        },
        {
          default: () => 'Try again'
        }
      )
    }),
  error: (t: toastParams) =>
    toast({
      title: `Error: ${t.title}`,
      description: t.description,
      variant: 'destructive',
      action: h(
        ToastAction,
        {
          altText: 'Try again'
        },
        {
          default: () => 'Try again'
        }
      )
    }),
  warning: (t: toastParams) =>
    toast({
      title: `warning: ${t.title}`,
      description: t.description,
      variant: 'destructive',
      action: h(
        ToastAction,
        {
          altText: 'Try again'
        },
        {
          default: () => 'Try again'
        }
      )
    }),
  info: (t: toastParams) =>
    toast({
      title: `${t.title}`,
      description: t.description,
      variant: 'destructive',
      action: h(
        ToastAction,
        {
          altText: 'Try again'
        },
        {
          default: () => 'Try again'
        }
      )
    })
}
