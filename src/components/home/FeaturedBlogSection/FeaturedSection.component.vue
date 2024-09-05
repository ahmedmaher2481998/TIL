<script setup lang="ts">
import { MainFeaturedBlogComponent, SecondaryFeaturedBlogComponent } from '@/components'
import { useBlogs } from '@/stores'
import { formatDisplayDate, getInitials } from '@/utils'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { watch } from 'vue'
import { reactive } from 'vue'

const { blogsStoreData } = storeToRefs(useBlogs())
// @ts-ignore
const main = ref<null | (typeof blogsStoreData.value.featured)[0]>(null)
watch(blogsStoreData.value, () => {
  console.log('featured changed => : ', blogsStoreData.value.featured)
  if (!blogsStoreData.value.loading && blogsStoreData.value.featured) {
    console.log('main changed to ', blogsStoreData.value.featured[0])
    main.value = blogsStoreData.value.featured[0] as any
  } else main.value = null
})
</script>
<template>
  <!-- loading skeleton  -->

  <section className=" bg-muted-foreground/10 py-12 w-full md:py-24">
    <div className="container w-full grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <MainFeaturedBlogComponent />
      <SecondaryFeaturedBlogComponent />
    </div>
  </section>
</template>

<style scoped></style>
