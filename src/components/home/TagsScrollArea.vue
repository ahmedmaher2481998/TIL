<script setup lang="ts">
import { Badge, ScrollArea, Skeleton } from '@/components'
import { Routes } from '@/router';
import { useTags } from '@/stores';
import { storeToRefs } from 'pinia';
const { tags } = storeToRefs(useTags())
</script>
<template>
  <div class="container">
    <h1 class="text-primary text-2xl font-bold leading-tight">
      Explore different subjects
    </h1>
    <ScrollArea v-if="tags.tags" class="p-2 rounded-md w-full whitespace-nowrap">
      <RouterLink :to="`/tags/${tag.slug}`" v-for='tag in tags.tags' :key="tag.id" class="m-1">
        <Badge variant="default" class="text-md  md:text-lg">
          #{{ tag.title }}
        </Badge>
      </RouterLink>
    </ScrollArea>
    <template v-else>
      <div class="space-y-3">
        <Skeleton class="h-6 w-24" v-for="n in 6" :key="n" />
      </div>
    </template>
  </div>
</template>