<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage, MainFeaturedBlogComponent, SecondaryFeaturedBlogComponent, Separator } from '@/components'

</script>
<template>

  <section class=" w-full mb-20">
    <div class="md:container mb-6 ">
      <h2 class="text-2xl font-bold text-primary leading-tight">Featured</h2>
    </div>
    <div class=" md:container w-full grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

      <MainFeaturedBlogComponent />
      <SecondaryFeaturedBlogComponent />
    </div>
  </section>
</template>

<style scoped></style>
