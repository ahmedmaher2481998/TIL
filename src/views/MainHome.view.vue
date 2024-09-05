<script setup lang="ts">
import { BlogCard, Skeleton, FeaturedSectionComponent, BlogsGrid } from '@/components'
import { useBlogs } from '@/stores'

const { blogsStoreData } = useBlogs()
</script>

<template>
  <!-- inspiration 
  https://dribbble.com/shots/24288831-slothUI-World-s-Laziest-Design-System-Blog-Article-Page-UIUX
   -->
  <main class="w-full bg-foreground space-y-8 min-h-screen">
    <FeaturedSectionComponent />
    <BlogsGrid />

  </main>
</template>
