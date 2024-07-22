import supabase from '@/supabase'
import { Tables, type TagType } from '@/types'
import { slugify } from '@/utils'
import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTags = defineStore('tags', () => {
  const storeDate = reactive<{ tags: TagType[] }>({ tags: [] })
  const selectAllTagsQuery = `id,title,slug,${Tables.Blogs} (*)`
  const tagsWithBlogsQuery = supabase.from(Tables.Tags).select(selectAllTagsQuery)
  type TagsWithBlogsType = QueryData<typeof tagsWithBlogsQuery>

  async function getAllTags() {
    const { data, error } = await tagsWithBlogsQuery
    if (error) throw error
    // @ts-ignore
    storeDate.tags = data as TagsWithBlogsType
    console.log('🚀 ~ getAllTags ~ data:', storeDate)
    return data
  }

  async function createNewTag(name: string) {
    /* to decrease chances of duplicated tags 
     const randomId = Math.random()
      .toString(36)
       .substring(2, 2 + length) */
    console.log('Adding', name)
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
      storeDate.tags.push(data[0] as TagType)
      console.log("🚀 ~ createNewTag ~ data:", data[0])
      console.log("🚀 ~ createNewTag ~ storeDate.tags:", storeDate.tags)
      return
    }
  }

  return {
    getAllTags,
    tags: storeDate,
    createNewTag
  }
})
