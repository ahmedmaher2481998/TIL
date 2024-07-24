import supabase from '@/supabase'
import { Tables, createBlogZodSchema, Bucket } from '@/types'
import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { z } from 'zod'

export const useTags = defineStore('tags', () => {

  const selectAllTagsQuery = `id,title,slug,${Tables.Blogs} (*)`
  const tagsWithBlogsQuery = supabase.from(Tables.Tags).select(selectAllTagsQuery)
  type TagsWithBlogsType = QueryData<typeof tagsWithBlogsQuery>
  async function uploadBlogCover(imf: File) {
    supabase.storage("")
  }
  async function createNewBlog(values: z.infer<typeof createBlogZodSchema>) {
    const { data, error } = await tagsWithBlogsQuery
    if (error) throw error
    // @ts-ignore
    storeDate.tags = data as TagsWithBlogsType
    return data
  }

  // async function createNewTag(name: string) {
  /* to decrease chances of duplicated tags 
   const randomId = Math.random()
    .toString(36)
     .substring(2, 2 + length) */
  // console.log('Adding', name)
  // const { data, error } = await supabase
  //   .from(Tables.Tags)
  //   .insert({
  //     title: name,
  //     slug: slugify(`${name}`)
  //   })
  //   .select(selectAllTagsQuery)

  // if (error) {
  //   console.error(error)
  //   return
  // } else {
  //   // @ts-ignore
  //   storeDate.tags.push(data[0] as TagType)
  //   return
  // }
  // }

  return {

  }
})
