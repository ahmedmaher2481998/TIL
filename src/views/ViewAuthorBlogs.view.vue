  <script setup lang="ts">
  import { BlogCard, BlogsGridSkeleton } from '@/components';
  import supabase from '@/supabase';
  import { Tables } from '@/types';
  import type { QueryData } from '@supabase/supabase-js';
  import { Table } from 'lucide-vue-next';
  import { onBeforeMount, reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute()
  const id = route.params.id;
  const author = ref('...')
  const query = supabase.from(Tables.Blogs).select(`
      id, title, slug, description, tldr, image_url, read_count, created_at, updated_at,
      ${Tables.Tags}(*),profiles(user_metadata, email, id)`).eq('author_id', id)

  type BlogsType = QueryData<typeof query>[number]

  const blogsStoreData = reactive<{
    blogs: BlogsType[],
    loading: boolean,
  }>({
    blogs: [],
    loading: true,
  });
  const router = useRouter()
  onBeforeMount(() => {
    query.then(res => {
      if (res.error) {
        console.error(res.error)
        router.push('/404')
        return
      }
      if (res.data) {
        blogsStoreData.blogs = res.data
        blogsStoreData.loading = false
        if (blogsStoreData.blogs.length > 0 && res.data[0]?.profiles?.user_metadata) {
          // @ts-ignore
          author.value = res.data[0].profiles.user_metadata?.name as string || ''
        }
      }
    })

  })
</script>
<template>
  <div>
    <div class="container flex justify-between items-center">
      <div>
        <h1 class="text-3xl text-primary  mt-6 mb-3 font-bold"></h1>
        <p class="text-foreground mb-6">Check out the all posts from {{ author }}</p>
      </div>

    </div>
    <BlogsGridSkeleton v-if="blogsStoreData.loading" />
    <div v-else-if="blogsStoreData.blogs.length" class="container pb-20 grid gap-4 grid-cols-1 md:grid-cols-2">
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
    <div v-else class="container pb-20 grid gap-4 grid-cols-1 md:grid-cols-2">
      <div class="text-center">
        <h1 class="text-2xl text-primary font-bold">No posts found</h1>
      </div>

    </div>
  </div>
</template>


<style lang="scss" scoped></style>