<script setup lang="ts">
import { cn } from '@/utils'
import { type ClassValue } from 'clsx'
import { LoaderCircle } from 'lucide-vue-next';

const { classes = undefined } = defineProps<{
  classes?: ClassValue[]
}>()

</script>
<template>
  <LoaderCircle :class="cn('animate-spin', classes)" />
</template>