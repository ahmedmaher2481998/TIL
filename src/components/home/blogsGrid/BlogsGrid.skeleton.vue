<script setup lang="ts">
import { Skeleton } from '@/components'
</script>

<template>

  <div class="container pb-20 grid gap-4 grid-cols-2 lg:grid-cols-3 md:grid-cols-2">

    <div v-for="i in 5 + Math.floor(Math.random() * 10)" :key="i" class="flex flex-col space-y-3">
      <Skeleton class="h-[40%] w-[450px] rounded-xl" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
    </div>
  </div>
</template>