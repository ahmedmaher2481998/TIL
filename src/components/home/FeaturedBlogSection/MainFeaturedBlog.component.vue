<script setup lang="ts">
import {

  MainFeatureBlogSkeleton, UserAvatarDisplay,
  Badge
} from '@/components'
import { useBlogs } from '@/stores'
import { storeToRefs } from 'pinia'
import { formatDisplayDate } from '@/utils'
import { computed } from 'vue'
import { useDarkMode } from '@/composable/useDarkMode'
import type { BlogTypeWithTagsAndProfile } from '@/types'
const { isDark } = useDarkMode()
const { blogsStoreData } = storeToRefs(useBlogs())
const ago = computed(() => formatDisplayDate(blogsStoreData.value.mainFeatured?.created_at ?? '', true))
const mainFeaturedBlog = computed(() => {
  return blogsStoreData.value.mainFeatured
})
</script>
<template>
  <MainFeatureBlogSkeleton v-if="blogsStoreData.loading" />

  <router-link :to="`/blog/${mainFeaturedBlog?.slug}`" v-else class="col-span-1 md:col-span-2 lg:col-span-2   group">
    <div class="relative h-[400px] overflow-hidden rounded-lg">
      <img :src="mainFeaturedBlog?.image_url" :alt="mainFeaturedBlog?.title" width="{1200}" height="{400}"
        class="h-full w-full object-cover" :style="{ aspectRatio: '1200/400', objectFit: 'cover' }" />
      <div :class="['absolute inset-0 bg-gradient-to-t  to-transparent group-hover:from-secondary-background from-background',

        {
          'group-hover:from-slate-200 from-slate-600': !isDark,
          'group-hover:from-slate-900 from-slate-800': isDark
        }]" />
      <div class="absolute bottom-0 left-0 right-0 p-6">
        <h2 class="text-xl md:text-2xl font-bold text-primary">{{ mainFeaturedBlog?.title }}</h2>
        <p class="mt-2 text-secondary-foreground truncate">
          {{ mainFeaturedBlog?.description }}
        </p>
        <div class="mb-2 flex flex-wrap gap-2">
          <router-link v-for="tag in mainFeaturedBlog?.tags" :key="tag.id" :to="`tags/${tag.slug}`">
            <Badge variant="default"> # {{ tag.title }} </Badge>
          </router-link>
        </div>
        <div class="mt-4 flex items-center gap-2 text-sm text-muted">
          <UserAvatarDisplay :name="mainFeaturedBlog?.profiles?.user_metadata['name']"
            :avatar="mainFeaturedBlog?.profiles?.user_metadata['avatar']"
            :authorId="mainFeaturedBlog?.profiles?.user_metadata['sub']" :ago="ago" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped></style>
