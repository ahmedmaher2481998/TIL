<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@/components'
import { type ClassValue } from 'clsx'

import { defineProps, toRefs } from 'vue'
interface Props {
  fieldName: string
  fieldLabel: string
  placeholder: string
  description?: string | null
  type?: string
  required?: boolean
  inputClasses?: ClassValue
}
const props = withDefaults(defineProps<Props>(), {
  description: '',
  inputClasses: '',
  type: 'text',
  required: false
})
const { description, inputClasses, fieldLabel, fieldName, placeholder, type, required } =
  toRefs(props)
</script>

<template lang="html">
  <FormField v-slot="{ componentField }" :name="fieldName">
    <FormItem>
      <FormLabel>{{ fieldLabel }}</FormLabel>
      <div class="relative w-full items-center">
        <FormControl>
          <Input
            :type="type"
            :class="inputClasses"
            :required="required"
            :placeholder="placeholder"
            v-bind="componentField"
          />
          <slot name="afterInput"></slot>
        </FormControl>
      </div>
      <FormDescription v-if="description">
        {{ description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
<style scoped>
input {
  width: 100% !important;
}
</style>
