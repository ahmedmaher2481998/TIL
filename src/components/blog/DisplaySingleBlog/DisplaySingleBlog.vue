<script setup lang="ts">
import { Badge, BlogViewCount, UserAvatarDisplay } from '@/components'
import { useDarkMode } from '@/composable/useDarkMode'
import { useBlogs } from '@/stores'
import { formatDisplayDate, notify } from '@/utils'
import { MdPreview, MdCatalog } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, onBeforeUnmount, ref, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DisplaySingleBlogSkeleton from './DisplaySingleBlog.skeleton.vue'


const { isDark } = useDarkMode()
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
  <div v-else class=" md:px-4 w-full ">
    <div class="flex mr-auto flex-col items-start max-w-screen-lg pt-0 ">
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
          <router-link v-for="tag in blog?.tags" :key="tag.id" :to="`/tags/${tag.slug}`" class="">
            <Badge variant="outline" class="text-primary text-sm"> # {{ tag.title }} </Badge>
          </router-link>
        </div>
      </header>

      <img :src="blog?.image_url" :alt="blog?.description" class="w-full object-cover max-h-96 rounded " />
      <div class="pt-6 w-full flex flex-col md:flex-row">
        <MdPreview class="mt-0 -mx-4 flex-1 order-2 md:order-1" :editor-id="id" :modelValue="blog?.content" lang="en-US"
          :theme="isDark ? 'light' : 'dark'" :noPrettier="true" noUploadImg />
        <!-- TODO  -->
        <!-- <MdCatalog :editorId="id" :scrollElement="scrollElement" class="order-1 md:order-2" /> -->

      </div>
    </div>
  </div>
</template>
<style>
.md-editor,
.md-editor-dar {
  border-radius: 20px;
}

#preview-only-preview {
  word-break: keep-all !important;
}



/* Common variables */
:root {
  --md-transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Light Theme */
.md-editor {
  --md-color: hsl(var(--secondary-foreground));
  --md-hover-color: hsl(var(--muted-foreground));
  --md-bk-color: hsl(var(--background));
  --md-bk-color-outstand: hsl(var(--card));
  --md-bk-hover-color: hsl(var(--accent) / 0.1);
  --md-border-color: hsl(var(--border));
  --md-border-hover-color: hsl(var(--border) / 0.8);
  --md-border-active-color: hsl(var(--ring));
  --md-modal-mask: hsl(var(--background) / 0.2);
  --md-scrollbar-bg-color: hsl(var(--muted) / 0.3);
  --md-scrollbar-thumb-color: hsl(var(--muted));
  --md-scrollbar-thumb-hover-color: hsl(var(--muted-foreground));
  --md-scrollbar-thumb-active-color: hsl(var(--primary));
  --md-editor-catalog-link-color: hsl(var(--secondary));

  background-color: var(--md-bk-color);
  color: var(--md-color);
  border-color: var(--md-border-color);
  transition: var(--md-transition);
}

.md-editor-toolbar {
  background-color: hsl(var(--card));
  border-bottom-color: var(--md-border-color);
}

.md-editor-toolbar-item {
  color: var(--md-color);
  background-color: transparent;
  transition: var(--md-transition);
}

.md-editor-toolbar-item:hover {
  color: hsl(var(--primary));
  background-color: var(--md-bk-hover-color);
}

.md-editor-content {
  background-color: var(--md-bk-color);

}

.md-editor-footer {
  background-color: hsl(var(--card));
  border-top-color: var(--md-border-color);
}

.md-editor-resize-operate {
  background: hsl(var(--primary));
  border-color: hsl(var(--primary));
}

/* Dark Theme */
.md-editor-dark {
  --md-color: hsl(var(--foreground));
  --md-hover-color: hsl(var(--muted-foreground));
  --md-bk-color: hsl(var(--background));
  --md-bk-color-outstand: hsl(var(--card));
  --md-bk-hover-color: hsl(var(--accent) / 0.2);
  --md-border-color: hsl(var(--border));
  --md-border-hover-color: hsl(var(--border) / 0.8);
  --md-border-active-color: hsl(var(--ring));
  --md-modal-mask: hsl(var(--background) / 0.8);
  --md-scrollbar-bg-color: hsl(var(--muted) / 0.3);
  --md-scrollbar-thumb-color: hsl(var(--muted));
  --md-scrollbar-thumb-hover-color: hsl(var(--muted-foreground));
  --md-scrollbar-thumb-active-color: hsl(var(--primary));
  --md-editor-catalog-link-color: hsl(var(--secondary));
}

/* Adjustments for both themes */
.md-editor,
.md-editor-dark {
  --md-radius: var(--radius);
}

.md-editor-toolbar,
.md-editor-footer {
  border-radius: var(--md-radius);
}

.md-editor-toolbar-item,
.md-editor-toolbar-item-dropdown {
  border-radius: calc(var(--md-radius) - 2px);
}

.md-editor input[type="checkbox"],
.md-editor-dark input[type="checkbox"] {
  accent-color: hsl(var(--primary));
}

.md-editor-catalog-link {
  color: hsl(var(--md-editor-catalog-link-color)) !important;
}
</style>
