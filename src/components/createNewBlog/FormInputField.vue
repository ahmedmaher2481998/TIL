<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, Input
} from '@/components';
import { defineProps, } from 'vue';
interface Props {
  fieldName: string
  fieldLabel: string
  placeholder: string
  description?: string | null
  // error: any
}
const {
  description = '',
  fieldLabel,
  fieldName,
  placeholder
} = withDefaults(defineProps<Props>(), {
  description: null
})

</script>

<template lang="html">


  <FormField v-slot="{ componentField }" :name="fieldName">
    <FormItem>
      <FormLabel>{{ fieldLabel }}</FormLabel>
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
