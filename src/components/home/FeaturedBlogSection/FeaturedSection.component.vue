<script setup lang="ts">
import { MainFeaturedBlogComponent, SecondaryFeaturedBlogComponent } from '@/components'

</script>
<template>

  <section className=" bg-secondary-foreground/50  py-12 w-full md:py-24">
    <div class="container mb-6 ">

      <h2 className="text-2xl font-bold text-primary-foreground leading-tight">Featured
      </h2>
    </div>

    <div className="container w-full grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <MainFeaturedBlogComponent />
      <SecondaryFeaturedBlogComponent />
    </div>
  </section>
</template>

<style scoped></style>
