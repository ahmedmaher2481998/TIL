<script setup lang="ts">
import { MainFeaturedBlogComponent, SecondaryFeaturedBlogComponent } from '@/components'
</script>
<template>
  <!-- loading skeleton  -->

  <section className=" bg-muted-foreground/10 py-12 md:py-24">
    <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <MainFeaturedBlogComponent />
      <SecondaryFeaturedBlogComponent />
    </div>
  </section>
</template>

<style scoped></style>
