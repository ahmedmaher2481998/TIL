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

const { blogsStoreData } = storeToRefs(useBlogs())

const secondaryFeaturedBlog = computed(() => {
  return blogsStoreData.value.secondaryFeatured
})
const ago = computed(() => formatDisplayDate(secondaryFeaturedBlog.value?.created_at ?? '', true))
</script>
<template>
  <SecondaryFeaturedBlogSkeleton v-if="blogsStoreData.loading" />
  <router-link :to="`/blog/${secondaryFeaturedBlog?.slug}`" className="col-span-1 md:col-span-1 lg:col-span-1">
    <div className="relative h-[400px] overflow-hidden rounded-lg">
      <img :src="secondaryFeaturedBlog?.image_url" :alt="secondaryFeaturedBlog?.title" width="{600}" height="{400}"
        className="h-full w-full object-cover" :style="{ aspectRatio: '600/400', objectFit: 'cover' }" />
      <div className="absolute inset-0 bg-gradient-to-t group-hover:from-secondary-foreground from-foreground " />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl md:text-2xl font-bold text-primary-foreground">
          {{ secondaryFeaturedBlog?.title }}
        </h3>

        <p className="mt-2 text-muted-foreground truncate">
          {{ secondaryFeaturedBlog?.description }}
        </p>
        <div className="mb-2 flex flex-wrap gap-2">
          <router-link v-for="tag in secondaryFeaturedBlog?.tags" :key="tag.id" :to="`tags/${tag.slug}`">
            <Badge variant="outline" class="text-muted-foreground"> # {{ tag.title }} </Badge>
          </router-link>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">

          <UserAvatarDisplay :name="secondaryFeaturedBlog?.profiles?.user_metadata.name"
            :avatar="secondaryFeaturedBlog?.profiles?.user_metadata?.avatar" :ago="ago" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped></style>
