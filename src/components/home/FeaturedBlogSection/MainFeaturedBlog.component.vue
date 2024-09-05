<script setup lang="ts">
import {

  MainFeatureBlogSkeleton, UserAvatarDisplay,
  Badge
} from '@/components'
import { useBlogs } from '@/stores'
import { storeToRefs } from 'pinia'
import { formatDisplayDate } from '@/utils'
import { computed } from 'vue'

const { blogsStoreData } = storeToRefs(useBlogs())
const ago = computed(() => formatDisplayDate(blogsStoreData.value.mainFeatured?.created_at ?? '', true))
const mainFeaturedBlog = computed(() => {
  return blogsStoreData.value.mainFeatured
})
</script>
<template>
  <MainFeatureBlogSkeleton v-if="blogsStoreData.loading" />

  <router-link :to="`/blog/${mainFeaturedBlog?.slug}`" v-else
    className="col-span-1 md:col-span-2 lg:col-span-2   group">
    <div className="relative h-[400px] overflow-hidden rounded-lg">
      <img :src="mainFeaturedBlog?.image_url" :alt="mainFeaturedBlog?.title" width="{1200}" height="{400}"
        className="h-full w-full object-cover" :style="{ aspectRatio: '1200/400', objectFit: 'cover' }" />
      <div
        className="absolute inset-0 bg-gradient-to-t  to-transparent group-hover:from-secondary-foreground from-foreground" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-xl md:text-2xl font-bold text-primary-foreground">{{ mainFeaturedBlog?.title }}</h2>
        <p className="mt-2 text-muted-foreground truncate">
          {{ mainFeaturedBlog?.description }}
        </p>
        <div className="mb-2 flex flex-wrap gap-2">
          <router-link v-for="tag in mainFeaturedBlog?.tags" :key="tag.id" :to="`tags/${tag.slug}`">
            <Badge variant="outline" class="text-muted-foreground"> # {{ tag.title }} </Badge>
          </router-link>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <UserAvatarDisplay :name="mainFeaturedBlog?.profiles?.user_metadata.name"
            :avatar="mainFeaturedBlog?.profiles?.user_metadata?.avatar" :ago="ago" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped></style>
