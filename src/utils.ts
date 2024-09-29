import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'
import { h } from 'vue'
import { useToast, ToastAction } from '@/components'
import relativeTime from 'dayjs/plugin/relativeTime'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  if (!name) return ''
  const [firstName, lastName] = name.split(' ')
  return firstName[0] + ' ' + lastName[0]
}

export function formatDisplayDate(date: string, relative: boolean = false) {
  if (relative) {
    dayjs.extend(relativeTime)
    return dayjs().to(dayjs(date))
  } else return dayjs(date).format('D-MMM YY')
}
export function formatStoreDate(date: Date) {
  return date.toISOString()
}

export function slugify(text: string, addRandomId: boolean = true, ampersand = 'and') {
  const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿỳýœæŕśńṕẃǵǹḿǘẍźḧ'
  const b = 'aaaaeeeeiiiioooouuuuncsyyyoarsnpwgnmuxzh'
  const p = new RegExp(a.split('').join('|'), 'g')

  let result = text
    .toString()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, `-${ampersand}-`)
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
  if (addRandomId) {
    result = result.concat('-', createRandomString())
  }
  return result
}
const toast = () => useToast().toast
type toastParams = {
  title: string
  description: string
}
export const notify = {
  success: (t: toastParams) =>
    toast()({
      title: `Success: ${t.title}`,
      description: t.description,
      variant: 'default',
      action: h(
        ToastAction,
        {
          altText: 'okay'
        },
        {
          default: () => 'okay'
        }
      )
    }),
  error: (t: toastParams) =>
    toast()({
      title: `Error: ${t.title}`,
      description: t.description,
      variant: 'destructive'
      // action: h(
      //   ToastAction,
      //   {
      //     altText: 'Try again'
      //   },
      //   {
      //     default: () => 'Try again'
      //   }
      // )
    }),
  warning: (t: toastParams) =>
    toast()({
      title: `warning: ${t.title}`,
      description: t.description,
      variant: 'destructive'
      // action: h(
      //   ToastAction,
      //   {
      //     altText: 'Try again'
      //   },
      //   {
      //     default: () => 'Try again'
      //   }
      // )
    }),
  info: (t: toastParams) =>
    toast()({
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

function createRandomString(length: number = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
