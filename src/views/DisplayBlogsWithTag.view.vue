<script setup lang="ts">
import { BlogCard } from '@/components'
import supabase from '@/supabase'
import { Tables } from '@/types'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tagSlug = route.params.tagSlug
const selectAllBlogsQuery = `
blogs(
id, title, slug, description, tldr, image_url, read_count, created_at, updated_at,
${Tables.Tags} (*),
profiles(user_metadata,email,id)
)
`
const { data } = await supabase
  .from(Tables.Tags)
  .select(selectAllBlogsQuery)
  .eq('slug', route.params.tagSlug)
  .single()
console.log('blog data: ', data)
</script>
<template>
  <main class="w-full min-h-screen">
    <div>displaying blog containing tag with slug : {{ tagSlug }}</div>
    <!-- <div v-if="" class="container pb-20 grid gap-4 grid-cols-2 lg:grid-cols-3">
    <div v-for="i in 5 + Math.floor(Math.random() * 10)" :key="i" class="flex flex-col space-y-3">
      <Skeleton class="h-[125px] w-[250px] rounded-xl" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
    </div>
  </div> -->
    <div class="container pb-20 grid gap-4 grid-cols-2 lg:grid-cols-3">
      <BlogCard v-for="blog in data?.blogs" :blog="{
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        tldr: blog.tldr,
        image: blog.image_url,
        avatar: blog.profiles?.user_metadata?.avatar as string ?? '',
        author: blog.profiles?.user_metadata?.name as string ?? '',
        tags: blog.tags,
        read_count: blog.read_count,
        created_at: blog.created_at
      }" :key="blog.id" />
    </div>
  </main>
</template>

<style scoped></style>
