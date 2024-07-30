import { z } from 'zod'

// UserType definition
export type UserType = {
  id: number
  name: string
  email: string
  posts: BlogType[]
  comments: CommentType[]
  createdAt: Date
  avatar: string
}

// BlogType definition
export type BlogType = {
  id: number
  title: string
  slug: string
  description: string
  tldr: string
  content: string
  image: string,
  image_id: string,
  comments: CommentType[],
  user: UserType,
  tags: TagType[]
  read_count: number
  author: UserType
  created_at: string
}

// TagType definition
export type TagType = {
  id: number
  title: string
  slug: string
  blogPosts: BlogType[]
}

// CommentType definition
export type CommentType = {
  id: number
  content: string
  blogPost: BlogType
  user: UserType
}
// Supabase Constants
export type createBlogWithTagsType = {
  blog_title: string;
  blog_slug: string;
  blog_description: string;
  blog_tldr: string;
  blog_content: string;
  blog_image_url: string;
  blog_image_id: string;
  blog_author_id: number,
  blog_tag_ids: number[]
}
export enum db_functions {
  createBlogWithTags = "create_blog_with_tags"

}
export type TableNameType = 'users' | 'blogs' | '' | 'comments' | 'tags' | 'blog_tags'
export const Bucket = "blogs-bucket"
export enum Tables {
  Users = 'users',
  Blogs = 'blogs',
  Comments = 'comments',
  Tags = 'tags',
  BlogTags = 'blog_tags'
}

// mock data 
/************************************************************ */
const image =
  'https://images.unsplash.com/flagged/1/apple-gear-looking-pretty.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
// Usage Example
export const exampleUser: UserType = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: image,
  posts: [],
  createdAt: new Date(),
  comments: []
}
export const exampleBlog: BlogType = {
  id: 1,
  slug: 'example-blog',
  title: 'Example Blog',
  description: 'This is an example blog.',
  tldr: 'Example blog tldr',
  content: 'This is the content of the example blog.',
  image,
  image_id: "",
  comments: [],
  tags: [],
  read_count: 0,
  author: exampleUser,
  created_at: new Date().toUTCString(), user: {} as UserType,
}

export const exampleTag: TagType = {
  id: 1,
  title: 'Example Tag',
  slug: 'example-tag',
  blogPosts: []
}

export const exampleComment: CommentType = {
  id: 1,
  content: 'This is an example comment.',
  blogPost: exampleBlog,
  user: exampleUser
}
/************************************************************ */
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
      }),
    // .url("image upload failed"),
    readCount: z.number().int().nonnegative().default(0),
    author_id: z.number().int().positive().default(1)
  })
  .transform((values) => ({
    ...values,
    tags: values.tags.map((t) => t.value)
  }))
