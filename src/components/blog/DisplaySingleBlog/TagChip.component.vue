<script setup lang="ts">
import { Badge } from '@/components'

const { title = '', slug = '', variant = 'default' } =
  defineProps<{
    title: string
    slug: string
    variant: 'default' | 'secondary' | 'destructive' | 'outline'
  }>()
</script>
<template>
  <Badge variant="outline">
    <router-link :to="`/tags/${slug}`" class="md:text-md text-lg">
      {{ '# ' + title }}
    </router-link>
  </Badge>
</template>

<style scoped></style>
