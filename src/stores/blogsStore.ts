import { useToast } from '@/components'
import supabase from '@/supabase'
import { Bucket, createBlogZodSchema, db_functions, Tables, type BlogType, type createBlogWithTagsType } from '@/types'
import { getImageUploadPath } from '@/utils'
import type { QueryData } from '@supabase/supabase-js'
// import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import z from 'zod'

export const useBlogs = defineStore('blogs', () => {
  const blogs = ref<BlogsType>([])
  const selectAllBlogsQuery = `* ,${Tables.Comments} (*),${Tables.Tags} (*)`
  const blogsWithBlogsQuery = supabase.from(Tables.Blogs).select(selectAllBlogsQuery)
  type BlogsType = QueryData<typeof blogsWithBlogsQuery>

  function abort(str: string) {
    console.log("error ....", str)

  }
  async function getBlogs() {
    const { data: blogsData, error: blogsError } = await blogsWithBlogsQuery
    if (blogsError) {
      console.log("error")
      return abort("unable to fetch blogs")
    }
    blogs.value = blogsData
    console.log(blogs.value)
  }
  async function CreateBlogPost(blog: z.infer<typeof createBlogZodSchema>) {

    const uploadPath = getImageUploadPath({
      img: blog.image as File,
      str: blog.slug,
      type: 'cover' as const // 'cover' is the type of blog cover image
    })

    if (!uploadPath) return abort("image processing failed ..")

    const img = await uploadBlogCover(blog.image as File, uploadPath as string)
    console.log('----------------------', 'submitted data', blog, 'image object', img)

    if (!img) return abort('image upload failed ..')
    const { data, error } = await supabase.rpc<db_functions, createBlogWithTagsType>(db_functions.createBlogWithTags, {
      blog_title: blog.title,
      blog_slug: blog.slug,
      blog_description: blog.description,
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
  async function uploadBlogCover(img: File, path: string): Promise<{
    id: string;
    url: string;
    path: string;
  }> {
    const { data: uploadData, error } = await supabase.storage.from(Bucket).upload(path, img)
    if (error) {
      const { toast } = useToast()
      toast({
        title: 'sorry! something went wrong .',
        description: `${error.message}`,
        variant: 'destructive'
      })
    }
    if (!uploadData) {
      console.log('error', error)
      console.log('upload data', uploadData)
      throw new Error("upload data returned empty")
    }
    const { data: imageData } = supabase.storage.from(Bucket).getPublicUrl(uploadData?.path)
    return {
      id: uploadData.id,
      url: imageData.publicUrl,
      path: uploadData.path
    }
  }

  return {
    uploadBlogCover, CreateBlogPost, blogs, getBlogs
  }
})
