<template lang="html">
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel class="capitalize">{{ label }}</FormLabel>
      <FormControl>
        <Input type="text" :placeholder="placeholder" v-bind="componentField" />
      </FormControl>
      <FormDescription v-if="description">
        {{ description }}
      </FormDescription>

      <FormMessage />
    </FormItem>
  </FormField>
</template>
<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { defineProps } from 'vue'
const {
  description = '',
  // error = '',
  label,
  name,
  placeholder
} = defineProps<{
  name: string
  label: string
  placeholder: string
  description?: string
  // error: any
}>()
</script>
