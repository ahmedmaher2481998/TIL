  <script setup lang="ts">
  import { LucideEye } from 'lucide-vue-next'
  const { count = 0 } = defineProps<{ count: number }>();

</script>
<template>
  <p v-if="count" class="flex items-center text-primary">
    <LucideEye />
    <span class="text-sm text-bold ml-2 flex">
      {{ count }}
    </span>
  </p>
</template>

