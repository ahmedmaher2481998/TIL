<script setup lang="ts">
import { BlogCard, Skeleton } from '@/components'
import { useBlogs } from '@/stores'

const { blogsStoreData } = useBlogs()
</script>

<template>
  <!-- inspiration 
  https://dribbble.com/shots/24288831-slothUI-World-s-Laziest-Design-System-Blog-Article-Page-UIUX
   -->
  <main class="w-full">
    <div
      v-if="blogsStoreData.loading"
      class="container pb-20 grid gap-4 grid-cols-2 lg:grid-cols-3"
    >
      <div v-for="i in 5 + Math.floor(Math.random() * 10)" :key="i" class="flex flex-col space-y-3">
        <Skeleton class="h-[125px] w-[250px] rounded-xl" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </div>
    <div v-else class="container pb-20 grid gap-4 grid-cols-2 lg:grid-cols-3">
      <BlogCard
        v-for="blog in blogsStoreData.blogs"
        :blog="{
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          tldr: blog.tldr,
          image: blog.image_url,
          avatar: blog.profiles?.user_metadata.avatar,
          author: blog.profiles?.user_metadata.name,
          tags: blog.tags,
          read_count: blog.read_count,
          created_at: blog.created_at
        }"
        :key="blog.id"
      />
    </div>
  </main>
</template>
