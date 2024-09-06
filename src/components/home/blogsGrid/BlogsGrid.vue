<script setup lang="ts">
import { BlogCard, BlogsGridSkeleton } from '@/components'
import { useBlogs } from '@/stores';
const { blogsStoreData } = useBlogs()
</script>
<template>
  <div class="container">
    <h1 class="text-3xl text-primary-foreground  my-6 font-bold">Latest Blogs</h1>
    <p class="text-gray-600">Check out the latest posts from our community.</p>
  </div>
  <BlogsGridSkeleton v-if="blogsStoreData.loading" />
  <div v-else class="container pb-20 grid gap-4 grid-cols-1 md:grid-cols-2">
    <BlogCard v-for="blog in blogsStoreData.blogs" :blog="{
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
    }" :key="blog.id" />
  </div>
</template>
