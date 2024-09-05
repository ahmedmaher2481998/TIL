<script setup lang="ts">
import { Skeleton } from '@/components'
</script>
<template>
  <div className="col-span-1 md:col-span-2 lg:col-span-2">
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
</template>

<style scoped></style>
