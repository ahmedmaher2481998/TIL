<script setup lang="ts">
import { Badge } from '@/components'
import { withDefaults, defineProps } from 'vue'
const { title, slug } = withDefaults(
  defineProps<{
    title: string
    slug: string
    variant: 'default' | 'secondary' | 'destructive' | 'outline'
  }>(),
  {
    title: '',
    slug: '',
    variant: 'default'
  }
)
</script>
<template>
  <Badge variant="outline">
    <router-link :to="`/tags/${slug}`" class="md:text-md text-lg">
      {{ '# ' + title }}
    </router-link>
  </Badge>
</template>

<style scoped></style>
