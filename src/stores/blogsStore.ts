import supabase, { uploadImageFile as uploadBlogCover } from '@/supabase'
import { createBlogZodSchema, db_functions, Tables } from '@/types'
import { notify } from '@/utils'
import type { QueryData } from '@supabase/supabase-js'
// import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { onBeforeMount, reactive } from 'vue'
import z from 'zod'

export const useBlogs = defineStore('blogs', () => {
  const blogsStoreData = reactive<{ blogs: BlogsWithTagsType; loading: boolean }>({
    blogs: [],
    loading: false
  })
  // Supabase Queries & types
  const selectAllBlogsQuery = `* ,${Tables.Comments} (*),${Tables.Tags} (*)`
  const blogsWithBlogsQuery = supabase.from(Tables.Blogs).select(selectAllBlogsQuery)
  type BlogsWithTagsType = QueryData<typeof blogsWithBlogsQuery>

  function abort(msg: string, desc: string) {
    notify.error({
      description: msg,
      title: desc
    })
  }
  onBeforeMount(async () => {
    console.log('fetching data ')
    blogsStoreData.loading = true
    try {
      await getAllBlogs().then(() => {
        blogsStoreData.loading = false
      })
    } catch (err: any) {
      blogsStoreData.loading = false
      return abort('failed to fetch blogs', err.message as string)
    }
  })

  async function getAllBlogs() {
    const { data: blogsData, error: blogsError } = await blogsWithBlogsQuery
    if (blogsError) {
      return abort('unable to fetch blogs', blogsError.message)
    }
    blogsStoreData.blogs = blogsData
    return blogsData
  }

  async function CreateBlogPost(blog: z.infer<typeof createBlogZodSchema>) {
    const { data, error } = await supabase.rpc(db_functions.createBlogWithTags, {
      blog_title: blog.title,
      blog_slug: blog.slug,
      blog_description: blog.description ?? 'no_description',
      blog_tldr: blog.tldr,
      blog_content: blog.content,
      blog_image_url: '', //img.url,
      blog_image_id: '', //img.id,
      blog_author_id: blog.author_id,
      blog_tag_ids: blog.tags
    })
    if (error) {
      abort('Error creating post and comment:', error.message)
    } else {
      const img = await uploadBlogCover({
        img: blog.image as File,
        str: blog.slug,
        type: 'cover' as const // 'cover' is the type of blog cover image
      })
      if (!img) return abort('image upload failed ..', 'check your network or try again later')
      await supabase.from(Tables.Blogs).update({
        image: img.url,
        image_id: img.id
      })

      notify.success({
        title: 'Post created successfully',
        description: 'check it out at your profile page'
      })
    }
  }

  return {
    uploadBlogCover,
    CreateBlogPost,
    blogsStoreData,
    getAllBlogs
  }
})
