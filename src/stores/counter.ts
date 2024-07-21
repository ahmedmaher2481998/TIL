import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { Tables, type TagType } from '@/types'
import supabase from '@/supabase'
import type { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useTags = defineStore('tags', () => {
  const storeDate = reactive<{ tags: TagType[] }>({ tags: [] })
  async function getAllTags() {
    const tagsWithBlogsQuery = supabase.from(Tables.Tags).select(`
  id,
  title,
  slug,
  ${Tables.Blogs} (
    id,
    title
  )
`)
    type TagsWithBlogsType = QueryData<typeof tagsWithBlogsQuery>
    const { data, error } = await tagsWithBlogsQuery
    if (error) throw error
    // @ts-ignore
    storeDate.tags = data as TagType[]
    // const data = await supabase.from(Tables.Tags).select(`*`)
    // data.tags = data.data() as TagType[]
    console.log('🚀 ~ getAllTags ~ data:', storeDate)
  }

  return {
    getAllTags
  }
})
