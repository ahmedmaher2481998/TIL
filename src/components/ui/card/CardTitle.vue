<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h3
    :class="
      cn('text-lg md:text-base lg:text1xl font-semibold leading-none tracking-tight', props.class)
    "
  >
    <slot />
  </h3>
</template>
