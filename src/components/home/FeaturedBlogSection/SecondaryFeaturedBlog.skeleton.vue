<script setup lang="ts">
import { Skeleton } from '@/components'
</script>
<template>
  <div class="col-span-1 md:col-span-1 lg:col-span-1">
    <div class="relative h-[400px] overflow-hidden rounded-lg">
      <Skeleton class="h-full w-full" />
      <div class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent dark:from-background/80" />
      <div class="absolute bottom-0 left-0 right-0 p-6">
        <h3 class="text-xl font-bold text-background">
          <Skeleton class="w-full h-6" />
        </h3>
        <p class="mt-2 text-muted">
          <Skeleton class="w-full h-4" />
        </p>
        <div class="mt-4 flex items-center gap-2 text-sm text-muted">
          <Skeleton class="h-6 w-6 rounded-full" />
          <span class="text-muted">Author Name</span>
          <span>•</span>
          <span class="text-muted">Date</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
