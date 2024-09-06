<script setup lang="ts">
import { Badge } from '@/components'
import UserAvatarDisplay from '@/components/auth/userMenu/UserAvatarDisplay.vue'
import { useBlogs } from '@/stores'
import { formatDisplayDate } from '@/utils'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, ref, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DisplaySingleBlogSkeleton from './DisplaySingleBlog.skeleton.vue'
const route = useRoute()
const id = 'preview-only'
const blogsStore = useBlogs()
const { blogsStoreData } = storeToRefs(blogsStore)
const blog = ref<Awaited<ReturnType<typeof blogsStore.getBlogBySlug>>>()
onBeforeMount(async () => {
  const data = await blogsStore.getBlogBySlug(route.params.slug as string ?? " ")
  if (!data) {
    const router = useRouter()
    router.push('/404')
  } else {
    blog.value = data
  }

})
const ago = computed(() => formatDisplayDate(blog?.value?.created_at ?? '', true))
const user: ComputedRef<{ name: string, avatar: string }> = computed(() => {
  return {
    // @ts-ignore
    name: blog.value?.profiles?.user_metadata?.name! ?? '', // @ts-ignore
    avatar: blog.value?.profiles?.user_metadata?.avatar ?? ''
  }
})
</script>
<template>
  <DisplaySingleBlogSkeleton v-if="blogsStoreData.loading" />
  <div v-else class="w-full bg-foreground flex flex-col px-2">
    <div class="container pt-4">
      <header>

        <h1 class=" text-primary-foreground text-2xl md:text-3xl mb-6">
          {{ blog?.title }}
        </h1>
        <!-- author display  -->
        <div class="m-4 mb-10">
          <UserAvatarDisplay :display-name="true" :avatar="user.avatar" :name="user.name" :ago="ago" size="base" />
        </div>
        <!-- display tags  -->
        <div className="my-4 space-x-2  flex flex-wrap">
          <router-link v-for="tag in blog?.tags" :key="tag.id" :to="`tags/${tag.slug}`" class="">
            <Badge variant="outline" class="text-primary-foreground text-sm"> # {{ tag.title }} </Badge>
          </router-link>
        </div>
      </header>

      <img :src="blog?.image_url" :alt="blog?.description"
        class="h-full max-w-screen-md object-cover max-h-96 rounded w-full" />
      <div class="max-w-screen-md  pt-6">
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

/* For Light Theme */
.md-editor {
  --md-color: hsl(var(--primary-foreground));
  --md-hover-color: hsl(var(--accent-foreground));
  --md-bk-color: hsl(var(--foreground));
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
  --md-color: hsl(var(--foreground));
  --md-hover-color: hsl(var(--primary-foreground));
  --md-bk-color: hsl(var(--background));
  --md-bk-color-outstand: hsl(var(--card));
  --md-bk-hover-color: hsl(var(--popover-foreground));
  --md-border-color: hsl(var(--border));
  --md-border-hover-color: hsl(var(--ring));
  --md-border-active-color: hsl(var(--ring));
  --md-modal-mask: hsl(var(--popover));
  --md-scrollbar-bg-color: hsl(var(--muted));
  --md-scrollbar-thumb-color: hsl(var(--accent-foreground));
  --md-scrollbar-thumb-hover-color: hsl(var(--secondary));
  --md-scrollbar-thumb-active-color: hsl(var(--primary));
}
</style>
