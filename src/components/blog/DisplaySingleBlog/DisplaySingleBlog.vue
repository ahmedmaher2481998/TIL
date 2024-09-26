<script setup lang="ts">
import { Badge, UserAvatarDisplay, BlogViewCount } from '@/components'
import { useBlogs } from '@/stores'
import { formatDisplayDate, notify } from '@/utils'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, onBeforeUnmount, ref, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DisplaySingleBlogSkeleton from './DisplaySingleBlog.skeleton.vue'
import { Eye } from 'lucide-vue-next'
import supabase from '@/supabase'
import { Tables } from '@/types'
const route = useRoute()
const id = 'preview-only'
const blogsStore = useBlogs()
const { blogsStoreData } = storeToRefs(blogsStore)
const blog = ref<Awaited<ReturnType<typeof blogsStore.getBlogBySlug>>>()
const router = useRouter()
const timer = ref()
const duration = 1000 * 60 * 2 //min read time is 2 min
onBeforeMount(async () => {
  const data = await blogsStore.getBlogBySlug(route.params.slug as string ?? " ")
  if (!data) {
    router.push('/404')
  } else {
    blog.value = data
    timer.value = setTimeout(async () => {
      try {
        await blogsStore.incrementBlogView(blog.value!.id)
        console.log('you just read this')
      } catch (error) {
        // console.error('Failed to increment blog view', error)
        notify.error({
          description: 'please verify your connection is stable',
          title: 'connection error'
        })
      }
    }, duration)
  }

})
onBeforeUnmount(() => {
  if (timer.value) {
    clearTimeout(timer.value)  // stop the timer
  }
})
const ago = computed(() => formatDisplayDate(blog?.value?.created_at ?? '', true))
const user: ComputedRef<{ name: string, avatar: string, id: string }> = computed(() => {
  return {
    // @ts-ignore
    name: blog.value?.profiles?.user_metadata['name'] ?? '',
    // @ts-ignore
    avatar: blog.value?.profiles?.user_metadata['avatar'] ?? '',
    // @ts-ignore
    id: blog.value?.profiles?.user_metadata['sub'] ?? ""
  }
})
</script>
<template>
  <DisplaySingleBlogSkeleton v-if="blogsStoreData.loading" />
  <div v-else class="px-0 md:px-2 w-full">
    <div class="flex mr-auto flex-col items-start max-w-screen-lg pt-0 sm:pt-4">
      <header class="w-full">

        <h1 class=" text-primary flex-wrap text-2xl md:text-3xl mb-6">
          {{ blog?.title }}
        </h1>


        <!-- author & views display  -->
        <div class="mb-4 px-2 w-full md:px-0 md:mb-6 flex flex-row justify-between ">
          <UserAvatarDisplay :authorId="user.id" :display-name="true" :avatar="user.avatar" :name="user.name" :ago="ago"
            size="base" />
          <BlogViewCount :count="blog?.read_count ?? 0" />
        </div>

        <!-- display tags  -->
        <div class="my-4 space-x-2  flex flex-wrap">
          <router-link v-for="tag in blog?.tags" :key="tag.id" :to="`tags/${tag.slug}`" class="">
            <Badge variant="outline" class="text-primary text-sm"> # {{ tag.title }} </Badge>
          </router-link>
        </div>
      </header>

      <img :src="blog?.image_url" :alt="blog?.description" class="w-full object-cover max-h-96 rounded " />
      <div class="pt-6">
        <MdPreview class="mt-0" :editor-id="id" :modelValue="blog?.content" />
      </div>
    </div>
  </div>
</template>
<style>
.md-editor,
.md-editor-dar {
  border-radius: 20px;
}

.preview-only-preview {
  word-break: normal !important;
}

/* For Light Theme */
.md-editor {
  --md-color: hsl(var(--primary));
  --md-hover-color: hsl(var(--accent-background));
  --md-bk-color: hsl(var(--background));
  --md-border-hover-color: hsl(var(--border));
  --md-border-active-color: hsl(var(--ring));
  --md-modal-mask: hsl(var(--popover));
  --md-scrollbar-bg-color: hsl(var(--muted));
  --md-scrollbar-thumb-color: hsl(var(--secondary));
  --md-scrollbar-thumb-hover-color: hsl(var(--accent));
  --md-scrollbar-thumb-active-color: hsl(var(--primary));
}

/* For Dark Theme */
.md-editor-dark {
  --md-color: hsl(var(--background));
  --md-hover-color: hsl(var(--primary-background));
  --md-bk-color: hsl(var(--background));
  --md-bk-color-outstand: hsl(var(--card));
  --md-bk-hover-color: hsl(var(--popover-background));
  --md-border-color: hsl(var(--border));
  --md-border-hover-color: hsl(var(--ring));
  --md-border-active-color: hsl(var(--ring));
  --md-modal-mask: hsl(var(--popover));
  --md-scrollbar-bg-color: hsl(var(--muted));
  --md-scrollbar-thumb-color: hsl(var(--accent-background));
  --md-scrollbar-thumb-hover-color: hsl(var(--secondary));
  --md-scrollbar-thumb-active-color: hsl(var(--primary));
}
</style>
