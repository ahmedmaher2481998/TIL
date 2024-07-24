<script setup lang="ts">
import { Label, Input, FormItem } from '@/components'
import { UploadOutlined } from '@vicons/material'
import { useField, } from 'vee-validate'
const { handleBlur, handleChange, errorMessage } = useField('image', undefined, {
  initialValue: null
})
</script>
<template lang="html">
  <FormItem class="grid w-full max-w-sm items-center gap-1.5">
    <Label for="picture" class="mb-2 bg-" :class="{ 'text-red-600': Boolean(errorMessage) }">Upload Blog Cover</Label>
    <div class="relative w-full  items-center">
      <Input accept="image/*" id="picture" type="file" class="pl-10 cursor-pointer" @change="handleChange"
        @blur="handleBlur" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <UploadOutlined class="size-6 text-muted-foreground" />
      </span>
    </div>
    <p v-if="Boolean(errorMessage)" class="text-sm font-medium text-destructive">
      {{ errorMessage }}
    </p>
  </FormItem>
</template>
