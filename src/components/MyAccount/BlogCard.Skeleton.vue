<template>
  <div class="">
    <Skeleton class=" h-[200px] w-full rounded-lg" />
    <div class=" px-6 pt-4">
      <Skeleton class=" h-6 w-3/4 mb-2" />
      <Skeleton class=" h-4 w-full mb-2" />
      <Skeleton class=" h-4 w-5/6 mb-2" />
      <div class=" flex items-center gap-2 text-sm mt-4">
        <Skeleton class=" h-6 w-6 rounded-full" />
        <Skeleton class=" h-4 w-1/4" />
        <Skeleton class=" h-4 w-1/6" />
        <Skeleton class=" h-4 w-1/5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components';


</script>

<style scoped></style>