<script setup lang="ts">
import { Badge, ScrollArea, Skeleton } from '@/components'
import { Routes } from '@/router';
import { useTags } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const { tags } = storeToRefs(useTags())
const numberOfTags = ref(4)
</script>
<template>
  <div class="container">
    <h1 class="text-primary text-2xl font-bold leading-tight">
      Explore different subjects
    </h1>
    <ScrollArea v-if="tags.tags" class="p-2 rounded-md w-full whitespace-nowrap">
      <RouterLink :to="`/tags/${tag.slug}`" v-for='(tag, index) in tags.tags' :key="tag.id" class="m-1"
        v-if="index < numberOfTags">
        <Badge variant="secondary" class="text-md  md:text-lg">
          #{{ tag.title }}
        </Badge>
      </RouterLink>
      <Badge v-else class="text-md cursor-pointer md:text-lg" @clikc="numberOfTags = tags.tags.length + 2">
        +{{ tags.tags.length - numberOfTags }} more
      </Badge>

    </ScrollArea>
    <template v-else>
      <div class="space-y-3">
        <Skeleton class="h-6 w-24" v-for="n in 6" :key="n" />
      </div>
    </template>
  </div>
</template>