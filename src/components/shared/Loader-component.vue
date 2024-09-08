<script setup lang="ts">
import { cn } from '@/utils.ts'
import { type ClassValue } from 'clsx'
import { LoaderCircle } from 'lucide-vue-next';

const { classes = undefined } = defineProps<{
  classes: ClassValue[] | undefined
}>()

</script>
<template>
  <LoaderCircle :class="cn('animate-spin', classes)" />
</template>