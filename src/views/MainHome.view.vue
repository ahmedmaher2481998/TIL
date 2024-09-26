<script setup lang="ts">
import { BlogsGrid, FeaturedSectionComponent } from '@/components';
import TagsScrollArea from '@/components/home/TagsScrollArea.vue';

</script>

<template>
  <main class="w-full px-2 md:px-0   space-y-4 min-h-screen">
    <FeaturedSectionComponent />
    <TagsScrollArea />
    <BlogsGrid />
  </main>
</template>
