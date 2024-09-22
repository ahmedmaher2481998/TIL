  <script setup lang="ts">
  import { BlogCard, BlogsGrid, BlogsGridSkeleton } from '@/components';
  import { useBlogs } from '@/stores';
  const { blogsStoreData } = useBlogs()

</script>
<template>
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
      created_at: blog.created_at,
      authorId: blog.profiles?.user_metadata['sub']
    }" :key="blog.id" />
  </div>
</template>


<style lang="scss" scoped></style>