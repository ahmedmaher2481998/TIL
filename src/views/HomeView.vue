<script setup lang="ts">
import { BlogCard, BlogCardSkelton, Skeleton } from '@/components'
import { useBlogs } from '@/stores/blogsStore'

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
      <div v-for="i in 12" :key="i" class="flex flex-col space-y-3">
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
          description: blog.description,
          tldr: blog.tldr,
          content: blog.content,
          image: blog.image,
          image_id: blog.image_id ?? '',
          comments: [],
          user: {
            avatar: blog.image,
            name: 'Ahmed maher',
            comments: [],
            email: 'a@a.com',
            posts: [],
            id: 1,
            createdAt: new Date()
          },
          tags: blog.tags,
          read_count: blog.read_count,
          author_id: blog.author_id,
          createdat: blog.createdat,
          updatedat: blog.updatedat
        }"
        :key="blog.id"
      />
    </div>
  </main>
</template>
