import supabase, { uploadImageFile as uploadBlogCover } from '@/supabase'
import { createBlogZodSchema, db_functions, Tables } from '@/types'
import { notify } from '@/utils'
import type { QueryData } from '@supabase/supabase-js'
import { defineStore, storeToRefs } from 'pinia'
import { onBeforeMount, reactive, ref, watch } from 'vue'
import { z } from 'zod'
import { useAuth } from '../auth'
import type { Database } from '@/supabase/database.types'


export const useBlogs = defineStore('blogs', () => {
  const selectAllBlogsQuery = `
id, title, slug, description, tldr, image_url, read_count, created_at, updated_at,
${Tables.Tags} (*),
profiles(user_metadata,email,id)
`
  const { AuthStoreState } = storeToRefs(useAuth())
  const blogsWithBlogsQuery = supabase.from(Tables.Blogs).select(selectAllBlogsQuery)
  type BlogsWithTagsType = QueryData<typeof blogsWithBlogsQuery>
  type singleBlogWithTags = BlogsWithTagsType[0]

  const blogsStoreData = reactive<{
    blogs: BlogsWithTagsType | null
    loading: boolean
    mainFeatured: null | singleBlogWithTags,
    secondaryFeatured: null | singleBlogWithTags,
  }>({
    blogs: null,
    loading: false, mainFeatured: null, secondaryFeatured: null
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
      //@ts-ignore to avoid Error:type instantiation is excessively deep
      blogsStoreData.blogs = blogs as BlogsWithTagsType
      if (featured?.length ?? 0 > 1) {
        blogsStoreData.mainFeatured = featured![0] as singleBlogWithTags
        blogsStoreData.secondaryFeatured = featured![1] as singleBlogWithTags
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
  async function getBlogBySlug(slug: string) {
    // select all columns, eager load comments, profiles, and tags.
    blogsStoreData.loading = true
    const query = `*,comments(*),profiles(*),tags(*)`
    type SingleBlogType = QueryData<typeof query>
    const { data, error } = await supabase
      .from(Tables.Blogs)
      .select(query)
      .eq('slug', slug)
      .single()
    if (error) {
      blogsStoreData.loading = false
      abort('Error getting blog', 'this blog is not available')
      // eslint-disable-next-line no-console
      console.error("🚀 ~ getBlogBySlug ~ error:", error)
      return null
    } else {
      blogsStoreData.loading = false
      return data
    }
  }
  async function incrementBlogView(blogId: number) {
    // if authenticated use userId to add blog to blog_readers
    const userId = AuthStoreState.value.isAuth ? AuthStoreState.value.id : null;
    // trigger the function that will increment reader count and add blog to blog_readers if user logged in
    const { error } = await supabase.rpc('increment_blog_view', {
      current_blog_id: blogId,
      //@ts-ignore
      current_user_id: userId,
    });
    if (error) {
      console.error('Error incrementing blog view:', error);
      throw error;
    }
  }
  const userBlogs = reactive<
    {
      read: Database['public']['Tables']['blogs']['Row'][] | undefined;
      wrote: Database['public']['Tables']['blogs']['Row'][] | undefined;
    }>({ read: undefined, wrote: undefined })
  async function getUsersBlogs() {
    if (!AuthStoreState.value.isAuth)
      throw new Error('un-authenticated')
    const getBlogsReadByUserQuery = supabase
      .from(Tables.Blogs)
      .select(`${selectAllBlogsQuery} ,${Tables.BlogsReaders}!inner (user_id)`).eq(`${Tables.BlogsReaders}.user_id`, AuthStoreState.value.id)

    const getBlogsCreatedByUserQuery = supabase
      .from(Tables.Blogs)
      .select(`${selectAllBlogsQuery}`).eq('author_id', AuthStoreState.value.id)

    const { data: blogsReadByUser, error: blogsReadByUserError } = await getBlogsReadByUserQuery
    const { data: blogsCreatedByUser, error: blogsCreatedByUserError } = await getBlogsCreatedByUserQuery
    if (blogsReadByUserError) throw blogsReadByUserError
    else
      //@ts-ignore to avoid Error:type instantiation is excessively deep
      userBlogs.read = blogsReadByUser
    if (blogsCreatedByUserError) throw blogsCreatedByUserError
    else  //@ts-ignore to avoid Error:type instantiation is excessively deep
      userBlogs.wrote = blogsCreatedByUser
  }
  return {
    blogsStoreData,
    uploadBlogCover,
    CreateBlogPost,
    getAllBlogs,
    getFeaturedBlogs,
    getBlogBySlug,
    incrementBlogView,
    getUsersBlogs,
    userBlogs
  }
})
