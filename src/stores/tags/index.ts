import supabase from '@/supabase'
import { Tables, type TagType } from '@/types'
import { slugify } from '@/utils'
import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { onMounted, reactive, ref } from 'vue'

export const useTags = defineStore('tags', () => {
  const tags = reactive<{ tags: TagType[] }>({ tags: [] })
  const selectAllTagsQuery = `id,title,slug,${Tables.Blogs} (*)`
  const tagsWithBlogsQuery = supabase.from(Tables.Tags).select(selectAllTagsQuery)
  type TagsWithBlogsType = QueryData<typeof tagsWithBlogsQuery>
  const selectAllBlogsByTagQuery = `*,blogs(id, title, slug, description, tldr, image_url, read_count, created_at, updated_at,
  ${Tables.Tags} (*),profiles(user_metadata,email,id))`
  // type selectAllBlogsByTagType = QueryData<typeof selectAllBlogsByTagQuery>
  onMounted(async () => {
    await getAllTags()
  })
  async function getAllTags() {
    const { data, error } = await tagsWithBlogsQuery
    if (error) throw error
    // @ts-ignore
    tags.tags = data as TagsWithBlogsType
    return data
  }

  async function createNewTag(name: string) {
    /* to decrease chances of duplicated tags 
     const randomId = Math.random()
      .toString(36)
       .substring(2, 2 + length) */

    const { data, error } = await supabase
      .from(Tables.Tags)
      .insert({
        title: name,
        slug: slugify(`${name}`)
      })
      .select(selectAllTagsQuery)

    if (error) {
      console.error(error)
      return
    } else {
      // @ts-ignore
      tags.tags.push(data[0] as TagType)
      return
    }
  }
  async function getBlogsByTagSlug(slug: string) {
    const loading = ref(true)
    const { data, error } = await supabase
      .from(Tables.Tags)
      .select(selectAllBlogsByTagQuery)
      .eq('slug', slug)
      .single()

    if (error) {
      loading.value = false
      throw error

    } else {
      loading.value = false
      return data
    }
  }
  return {
    getAllTags,
    tags, getBlogsByTagSlug,
    createNewTag
  }
})
