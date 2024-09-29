import type { Database } from '@/supabase/database.types'
import { z } from 'zod'

export type BlogType = Database['public']['Tables']['blogs']['Row']
export type ProfilesType = Database['public']['Tables']['profiles']['Row']
export type TagsType = Database['public']['Tables']['tags']['Row']

export type BlogTypeWithTagsAndProfile = {
  profiles: ProfilesType,
  tags: TagsType[],
} & BlogType

export type createBlogWithTagsType = {
  blog_title: string
  blog_slug: string
  blog_description: string
  blog_tldr: string
  blog_content: string
  blog_image_url: string
  blog_image_id: string
  blog_author_id: number
  blog_tag_ids: number[]
}
export enum db_functions {
  createBlogWithTags = 'create_blog_with_tags',
  incrementBlogViews = 'increment_blog_view'
}
export type TableNameType = 'users' | 'blogs' | '' | 'comments' | 'tags' | 'blog_tags'
export const Bucket = 'blogs-bucket'
export enum Tables {
  Users = 'users',
  Blogs = 'blogs',
  Comments = 'comments',
  Tags = 'tags',
  BlogTags = 'blog_tags',
  BlogsReaders = 'blog_readers'
}

// error message generator
const errorMsg = (name: string) => ({
  max: (max: number) => `${name} can't be more than ${max} chars`,
  min: (min: number) => `${name} is ${min} chars min`,
  require: () => `${name} is required`
})
// schema
export const createBlogZodSchema = z
  .object({
    slug: z
      .string({ message: errorMsg('slug').require() })
      .min(1)
      .max(255)
      .trim(),
    title: z
      .string({ message: errorMsg('title').require() })
      .min(20, errorMsg('title').min(20))
      .max(255, errorMsg('title').max(255))
      .trim(),
    description: z
      .string({ message: errorMsg('description').require() })
      .min(50, errorMsg('description').min(50))
      .max(1000, errorMsg('description').max(1000))
      .nullable(),
    tldr: z
      .string({ message: errorMsg('tldr').require() })
      .min(50, errorMsg('tldr').min(50))
      .max(1000, errorMsg('tldr').max(500))
      ?.trim(),
    content: z.string({ message: "cant's post empty blog" }).min(500, errorMsg('content').min(500)),
    tags: z.array(z.object({ name: z.string(), value: z.number() }), {
      message: errorMsg('tags').require()
    }),
    image: z
      .instanceof(File, { message: errorMsg('image').require() })
      .refine((file) => file.type.startsWith('image/'), {
        message: 'Image upload failed, file must be an image'
      })
      .refine((f: File) => f.size / (1024 * 1024) < 5, { message: 'max image size is 5mb' }),
    // .url("image upload failed"),
    readCount: z.number().int().nonnegative().default(0),
    author_id: z.string().uuid()
  })
  .transform((values) => ({
    ...values,
    tags: values.tags.map((t) => t.value)
  }))
export const registerSchemaZod = z
  .object({
    email: z.string().email('invalid email').min(1, 'Email is required'),
    avatar: z
      .instanceof(File, { message: errorMsg('image').require() })
      .refine((file) => file.type.startsWith('image/'), {
        message: 'Image upload failed, file must be an image'
      })
      .refine((f: File) => f.size / (1024 * 1024) < 5, { message: 'max image size is 5mb' }),

    name: z
      .string()
      .min(1, 'Name is required')
      .refine(
        (value) => {
          const words = value.trim().split(/\s+/)
          return words.length === 2
        },
        {
          message: 'Name must contain your first and last name separated by a space',
          path: ['name']
        }
      ),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

// POP UP Ui Related Types
export type ViewType = 'login' | 'register ' | 'logout' | 'addNewTag' | 'updateUserProfile'
