<script setup lang="ts">
import { BlogsGrid, FeaturedSectionComponent } from '@/components';
import TagsScrollArea from '@/components/home/TagsScrollArea.vue';

</script>

<template>
  <main class="w-full  space-y-4 min-h-screen">
    <FeaturedSectionComponent />
    <TagsScrollArea />
    <BlogsGrid />
  </main>
</template>
