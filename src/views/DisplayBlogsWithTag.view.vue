<script setup lang="ts">
import { BlogCard, Skeleton } from '@/components'
import { useTags } from '@/stores'
import supabase from '@/supabase'
import { Tables } from '@/types'
import { notify } from '@/utils'
import { onBeforeMount, onMounted, ref, Suspense } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const { getBlogsByTagSlug } = useTags()
const route = useRoute()
const tagSlug = route.params.tagSlug as string
const router = useRouter()
let data = ref<Awaited<ReturnType<typeof getBlogsByTagSlug>>>()
onMounted(async () => {
  try {
    data.value = await getBlogsByTagSlug(tagSlug)
  } catch (error) {
    notify.error({
      title: 'Sorry this page is not available',
      description: 'Failed to retrieve blogs by tag slug.',
    })
    router.back()
  }
})


</script>
<template>
  <main class="w-full min-h-screen">

    <div class="container pb-20 grid gap-4 grid-cols-2 lg:grid-cols-3">
      <Suspense>
        <BlogCard v-for="blog in data?.blogs" :blog="{
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          tldr: blog.tldr,
          image: blog.image_url,
          // @ts-ignore
          avatar: blog.profiles?.user_metadata?.avatar as string ?? '',
          // @ts-ignore
          author: blog.profiles?.user_metadata?.name as string ?? '',
          tags: blog.tags,
          read_count: blog.read_count,
          created_at: blog.created_at
        }" :key="blog.id" />
        <template #fallback>
          <div v-for="i in 5 + Math.floor(Math.random() * 10)" :key="i" class="flex flex-col space-y-3">
            <Skeleton class="h-[125px] w-[250px] rounded-xl" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-[250px]" />
              <Skeleton class="h-4 w-[200px]" />
            </div>
          </div>
        </template>
      </Suspense>

    </div>
  </main>
</template>

<style scoped></style>
