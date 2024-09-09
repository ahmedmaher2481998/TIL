<script setup lang="ts">
import { BlogCard, BlogsGridSkeleton, Button } from '@/components'
const { link = true } = defineProps<{ link: boolean }>()
import { useBlogs } from '@/stores';
const { blogsStoreData } = useBlogs()
</script>
<template>
  <div class="container flex justify-between items-center">
    <div>
      <h1 class="text-3xl text-primary  mt-6 mb-3 font-bold">Latest Blogs</h1>
      <p class="text-muted-foreground">Check out the latest posts from our community.</p>
    </div>
    <RouterLink to="/blog" v-if="link">
      <Button variant="link">

        view all
      </Button>
    </RouterLink>
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
