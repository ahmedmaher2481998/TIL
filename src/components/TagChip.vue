<template lang="html">
  <RouterLink :to="{ href }">
    <Badge
      class="border me-1 cursor-pointer text-slate-100 border-white text-center w-full text-sm p-2 rounded-3xl"
    >
      {{ tag }}
    </Badge>
  </RouterLink>
</template>

<script setup lang="ts">
import { Badge } from './ui/badge/index'
const { tag, href } = defineProps<{
  tag: string
  href: ''
}>()
</script>
