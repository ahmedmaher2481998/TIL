import supabase, { uploadImageFile as uploadBlogCover } from '@/supabase'
import { createBlogZodSchema, db_functions, Tables } from '@/types'
import { getImageUploadPath } from '@/utils'
import type { QueryData } from '@supabase/supabase-js'
// import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { onBeforeMount, reactive } from 'vue'
import z from 'zod'

export const useBlogs = defineStore('blogs', () => {
  const blogsStoreData = reactive<{ blogs: BlogsWithTagsType, loading: boolean }>({ blogs: [], loading: false })
  // Supabase Queries & types 
  const selectAllBlogsQuery = `* ,${Tables.Comments} (*),${Tables.Tags} (*)`
  const blogsWithBlogsQuery = supabase.from(Tables.Blogs).select(selectAllBlogsQuery)
  type BlogsWithTagsType = QueryData<typeof blogsWithBlogsQuery>


  function abort(str: string) {
    console.log("error ....", str)

  }

  onBeforeMount(
    async () => {
      console.log("fetching data ")
      blogsStoreData.loading = true
      try {
        await getAllBlogs().then(() => {
          blogsStoreData.loading = false
        })
      } catch (err) {
        blogsStoreData.loading = false
        return abort("failed to fetch blogs")
      }
    }
  )

  async function getAllBlogs() {
    const { data: blogsData, error: blogsError } = await blogsWithBlogsQuery
    if (blogsError) {
      console.log("error")
      return abort("unable to fetch blogs")
    }
    blogsStoreData.blogs = blogsData
    console.log("🚀 ~ getAllBlogs ~ blogs.value:", blogsStoreData.blogs)
    return blogsData
  }

  async function CreateBlogPost(blog: z.infer<typeof createBlogZodSchema>) {

    const uploadPath = getImageUploadPath({
      img: blog.image as File,
      str: blog.slug,
      type: 'cover' as const // 'cover' is the type of blog cover image
    })

    if (!uploadPath) return abort("image processing failed ..")
    const img = await uploadBlogCover(blog.image as File, uploadPath as string)
    // console.log('----------------------', 'submitted data', blog, 'image object', img)

    if (!img) return abort('image upload failed ..')
    const { data, error } = await supabase.rpc(db_functions.createBlogWithTags, {
      blog_title: blog.title,
      blog_slug: blog.slug,
      blog_description: blog.description ?? "no_description",
      blog_tldr: blog.tldr,
      blog_content: blog.content,
      blog_image_url: img.url,
      blog_image_id: img.id,
      blog_author_id: blog.author_id,
      blog_tag_ids: blog.tags
    });
    if (error) {
      console.error('Error creating post and comment:', error);
    } else {
      console.log('Post and comment created successfully:', data);
    }
  }


  return {
    uploadBlogCover, CreateBlogPost, blogsStoreData, getAllBlogs,
  }
})
