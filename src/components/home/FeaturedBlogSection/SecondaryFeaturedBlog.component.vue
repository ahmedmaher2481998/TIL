<script setup lang="ts">
import {
  Avatar,
  SecondaryFeaturedBlogSkeleton,
  AvatarFallback,
  AvatarImage,
  Skeleton,
  Badge,
  UserAvatarDisplay
} from '@/components'
import { useBlogs } from '@/stores'
import { storeToRefs } from 'pinia'
import { formatDisplayDate, getInitials } from '@/utils'
import { computed } from 'vue'
import { useDarkMode } from '@/composable/useDarkMode'

const { blogsStoreData } = storeToRefs(useBlogs())

const secondaryFeaturedBlog = computed(() => {
  return blogsStoreData.value.secondaryFeatured
})
const ago = computed(() => formatDisplayDate(secondaryFeaturedBlog.value?.created_at ?? '', true))
const { isDark } = useDarkMode()
</script>
<template>
  <SecondaryFeaturedBlogSkeleton v-if="blogsStoreData.loading" />
  <router-link :to="`/blog/${secondaryFeaturedBlog?.slug}`" class="col-span-1 group  md:col-span-1 lg:col-span-1">
    <div class="relative h-[400px] overflow-hidden rounded-lg">
      <img :src="secondaryFeaturedBlog?.image_url" :alt="secondaryFeaturedBlog?.title" width="{600}" height="{400}"
        class="h-full w-full object-cover" :style="{ aspectRatio: '600/400', objectFit: 'cover' }" />
      <div :class="['absolute inset-0 bg-gradient-to-tr to-transparent transition-colors duration-300 ', {
        'group-hover:from-pink600 from-pink-600/80': !isDark,

        'group-hover:from-pink-800 from-pink-800/80': isDark
      }]" />
      <div class="absolute bottom-0 left-0 right-0 p-6">
        <h3 class="text-xl md:text-2xl font-bold text-primary">
          {{ secondaryFeaturedBlog?.title }}
        </h3>

        <p class="mt-2 text-secondary-foreground truncate">
          {{ secondaryFeaturedBlog?.description }}
        </p>
        <div class="mb-2 flex flex-wrap gap-2">
          <router-link v-for="tag in secondaryFeaturedBlog?.tags" :key="tag.id" :to="`tags/${tag.slug}`">
            <Badge variant="default" class=""> # {{ tag.title }}
            </Badge>
          </router-link>
        </div>
        <div class="mt-4 flex items-center gap-2 text-sm text-muted">

          <UserAvatarDisplay :name="secondaryFeaturedBlog?.profiles?.user_metadata.name"
            :avatar="secondaryFeaturedBlog?.profiles?.user_metadata?.avatar" :ago="ago" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped></style>
