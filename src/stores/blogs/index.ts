import supabase, { uploadImageFile as uploadBlogCover } from '@/supabase'
import { createBlogZodSchema, db_functions, Tables } from '@/types'
import { notify } from '@/utils'
import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { onBeforeMount, reactive } from 'vue'
import { z } from 'zod'


export const useBlogs = defineStore('blogs', () => {
  const selectAllBlogsQuery = `
id, title, slug, description, tldr, image_url, read_count, created_at, updated_at,
${Tables.Tags} (*),
profiles(user_metadata,email,id)
`

  const blogsWithBlogsQuery = supabase.from(Tables.Blogs).select(selectAllBlogsQuery)
  type BlogsWithTagsType = QueryData<typeof blogsWithBlogsQuery>
  type singleBlogWithTags = BlogsWithTagsType[0]
  const blogsStoreData = reactive<{
    blogs: BlogsWithTagsType | null
    loading: boolean
    mainFeatured: null | singleBlogWithTags,
    secondaryFeatured:null | singleBlogWithTags,
  }>({
    blogs: null,
    loading: false,mainFeatured:null , secondaryFeatured:null 
  })

  function abort(title: string, desc: string) {
    notify.error({
      description: desc,
      title: title
    })
  }

  onBeforeMount(async () => {

    blogsStoreData.loading = true
    try {
      const blogs = await getAllBlogs()
      const featured = await getFeaturedBlogs()
      blogsStoreData.loading = false
      // @ts-expect-error
      blogsStoreData.blogs = blogs as BlogsWithTagsType
      if(featured?.length ??  0  > 1 ) { 
        blogsStoreData.mainFeatured = featured![0] as singleBlogWithTags
        blogsStoreData.secondaryFeatured = featured![1]  as singleBlogWithTags
      }
    } catch (err: any) {
      blogsStoreData.loading = false
      return abort('Failed to fetch blogs & featured ', err.message as string)
    }
  })

  async function getAllBlogs(): Promise<BlogsWithTagsType | null> {
    const { data: blogsData, error: blogsError } = await blogsWithBlogsQuery
    if (blogsError) {
      abort('Unable to fetch blogs', blogsError.message)
      return null
    }

    return blogsData
  }

  async function CreateBlogPost(blog: z.infer<typeof createBlogZodSchema>) {
    const img = await uploadBlogCover({
      img: blog.image as File,
      str: blog.slug,
      type: 'cover'
    })
    if (!img) return abort('Image upload failed', 'Check your network or try again later')

    const { error } = await supabase.rpc(db_functions.createBlogWithTags, {
      blog_title: blog.title,
      blog_slug: blog.slug,
      blog_description: blog.description ?? 'no_description',
      blog_tldr: blog.tldr,
      blog_content: blog.content,
      blog_image_url: img.url,
      blog_image_id: img.id,
      blog_author_id: blog.author_id,
      blog_tag_ids: blog.tags
    })
    if (error) {
      abort('Error creating post:', error.message)
    } else {
      notify.success({
        title: 'Post created successfully',
        description: 'Check it out on your profile page'
      })
    }
  }

  async function getFeaturedBlogs(): Promise<BlogsWithTagsType | null> {
    const { data: featuredBlogsWithBlogsQuery, error } = await supabase
      .from(Tables.Blogs)
      .select(selectAllBlogsQuery)
      .eq('featured', true)
    if (error) abort('Error getting featured blogs:', error.message)
    return featuredBlogsWithBlogsQuery
  }

  return {
    blogsStoreData,
    uploadBlogCover,
    CreateBlogPost,
    getAllBlogs,
    getFeaturedBlogs
  }
})
