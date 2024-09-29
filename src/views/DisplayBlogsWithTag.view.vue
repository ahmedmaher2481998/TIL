<script setup lang="ts">
import { Badge, BlogCard, Skeleton } from '@/components'
import { useTags } from '@/stores'
import { notify } from '@/utils'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const { getBlogsByTagSlug } = useTags()
const route = useRoute()
const tagSlug = route.params.tagSlug as string
const router = useRouter()
const getRouteData = async () => {
  try {
    data.value = await getBlogsByTagSlug(tagSlug)
  } catch (error) {
    notify.error({
      title: 'Sorry this page is not available',
      description: 'Failed to retrieve blogs by tag slug.',
    })
    router.back()
  }
}
let data = ref<Awaited<ReturnType<typeof getBlogsByTagSlug>> | undefined>()
onMounted(getRouteData)
watch(() => route.path, async (newPath, oldPath) => {
  // console.log(`Route changed from ${oldPath} to ${newPath}`)
  await getRouteData()
})


</script>
<template>
  <main class="w-full min-h-screen">

    <div v-if="!data" class="container pb-20 grid gap-4 grid-cols-2 lg:grid-cols-3">
      <Skeleton class="w-1/5 h-4" />
      <div v-for="i in 5 + Math.floor(Math.random() * 10)" :key="i" class="flex flex-col space-y-3">
        <Skeleton class="h-[125px] w-[250px] rounded-xl" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </div>

    <div v-else class="container pb-20">

      <h1 class="text-primary  mb-10 mx-2 flex flex-col">
        <Badge variant="default" class="text-3xl px-4 py-2 max-w-max">
          # {{ data.title }}
        </Badge>
        <span class="text-sm pt-2 p-4 text-muted-foreground">here's a list of all the posts tagged with
          <span class="underline underline-offset-4">
            # {{ data.title }}
          </span>
        </span>
      </h1>
      <p class="text-secondary-foreground text-sm my-2 mx-4 flex flex-col">
        <span>
          Total Posts: {{ data.blogs.length }}
        </span>

      </p>
      <div class="container  grid gap-4 grid-cols-1 lg:grid-cols-3">
        <BlogCard v-for="blog in data.blogs" :blog="{
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          tldr: blog.tldr,
          image: blog.image_url,
          avatar: blog.profiles?.user_metadata['avatar'] as string ?? '',
          author: blog.profiles?.user_metadata['name'] as string ?? '',
          tags: blog.tags,
          read_count: blog.read_count,
          created_at: blog.created_at,
          authorId: blog.profiles.user_metadata['sub']
        }" :key="blog.id" />
      </div>
    </div>

  </main>
</template>

<style scoped></style>
