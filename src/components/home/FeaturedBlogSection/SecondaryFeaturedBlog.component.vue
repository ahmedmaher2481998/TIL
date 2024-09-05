<script setup lang="ts">
import {
  Avatar,
  SecondaryFeaturedBlogSkeleton,
  AvatarFallback,
  AvatarImage,
  Skeleton,
  Badge
} from '@/components'
import { useBlogs } from '@/stores'
import { storeToRefs } from 'pinia'
import { formatDisplayDate, getInitials } from '@/utils'
import { computed } from 'vue'

const { blogsStoreData } = storeToRefs(useBlogs())
const secondary = computed(() => {
  if (
    !blogsStoreData.value.loading &&
    blogsStoreData.value.featured &&
    blogsStoreData.value.featured.length > 1
  )
    return blogsStoreData.value.featured[1]
  else return null
})
</script>
<template>
  <SecondaryFeaturedBlogSkeleton v-if="blogsStoreData.loading" />
  <div v-else className="col-span-1 md:col-span-1 lg:col-span-1">
    <div className="relative h-[400px] overflow-hidden rounded-lg">
      <img
        :src="secondary?.image_url"
        :alt="secondary?.title"
        width="{600}"
        height="{400}"
        className="h-full w-full object-cover"
        :style="{ aspectRatio: '600/400', objectFit: 'cover' }"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent dark:from-background/80"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold text-foreground">
          {{ secondary?.title }}
        </h3>

        <p className="mt-2 text-muted-foreground">
          {{ secondary?.description }}
        </p>
        <div className="mb-2 flex flex-wrap gap-2">
          <router-link v-for="tag in secondary?.tags" :key="tag.id" :to="`tags/${tag.slug}`">
            <Badge variant="outline" class="text-muted"> # {{ tag.title }} </Badge>
          </router-link>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6 border">
            <AvatarImage
              :src="secondary?.profiles?.user_metadata?.avatar"
              :alt="secondary?.profiles?.user_metadata?.name"
            />

            <AvatarFallback>{{
              getInitials(secondary?.profiles?.user_metadata?.name ?? '')
            }}</AvatarFallback>
          </Avatar>
          <span>{{ secondary?.profiles?.user_metadata.name }}</span>
          <span>•</span>
          <span>{{ formatDisplayDate(secondary?.created_at ?? '') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
