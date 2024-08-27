<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage, Skeleton, Badge } from '@/components'
import { useBlogs } from '@/stores'
import { storeToRefs } from 'pinia'
import { formatDisplayDate, getInitials } from '@/utils'
import { computed, ref } from 'vue'
import { watch } from 'vue'
import { reactive } from 'vue'

const { blogsStoreData } = storeToRefs(useBlogs())
// const main = computed(() => {
//   if (!blogsStoreData.value.loading && blogsStoreData.value.featured) {
//     console.log('main changed to ', blogsStoreData.value.featured[0])
//     return blogsStoreData.value.featured[0]
//   } else return null
// })
const main = ref(null)
watch(blogsStoreData, () => {
  console.log('featured', blogsStoreData.value.featured)
  if (!blogsStoreData.value.loading && blogsStoreData.value.featured) {
    console.log('main changed to ', blogsStoreData.value.featured[0])
    main.value = blogsStoreData.value.featured[0] as any
  } else main.value = null
})
</script>
<template>
  <!-- // TODO Use this component to encapsule the main featured blog card -->
  <div v-if="blogsStoreData.loading" className="col-span-1 md:col-span-2 lg:col-span-2">
    <div className="relative h-[400px] overflow-hidden rounded-lg">
      <Skeleton className="h-full w-full" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent dark:from-background/80"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-2xl font-bold text-foreground">
          <Skeleton className="w-full h-6" />
        </h2>
        <p className="mt-2 text-muted-foreground">
          <Skeleton className="w-full h-4" />
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Skeleton className="h-6 w-6 rounded-full" />
          <span className="text-muted-foreground">Author Name</span>
          <span>•</span>
          <span className="text-muted-foreground">Date</span>
        </div>
      </div>
    </div>
  </div>

  <div v-else className="col-span-1 md:col-span-2 lg:col-span-2">
    <div className="relative h-[400px] overflow-hidden rounded-lg">
      <img
        :src="main?.image_url"
        :alt="main?.title"
        width="{1200}"
        height="{400}"
        className="h-full w-full object-cover"
        :style="{ aspectRatio: '1200/400', objectFit: 'cover' }"
      />
      <div className="absolute inset-0 bg-gradient-to-t  to-transparent from-background/80" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-2xl font-bold text-foreground">{{ main?.title }}</h2>
        <p className="mt-2 text-muted-foreground">
          {{ main?.description }}
        </p>
        <div className="mb-2 flex flex-wrap gap-2">
          <router-link v-for="tag in main?.tags" :key="tag.id" :to="`tags/${tag.slug}`">
            <Badge variant="outline" class="text-muted"> # {{ tag.title }} </Badge>
          </router-link>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6 border">
            <AvatarImage
              :src="main?.profiles?.user_metadata?.avatar"
              :alt="main?.profiles?.user_metadata?.name"
            />
            <AvatarFallback>{{
              getInitials(main?.profiles?.user_metadata?.name ?? '')
            }}</AvatarFallback>
          </Avatar>
          <span>{{ main?.profiles?.user_metadata.name }}</span>
          <span>•</span>
          <span>{{ formatDisplayDate(main?.created_at ?? '') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
