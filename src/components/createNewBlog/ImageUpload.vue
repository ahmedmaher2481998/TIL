<script setup lang="ts">
import { Label, Input, FormItem } from '@/components'
import { UploadOutlined } from '@vicons/material'
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'
const { handleBlur, handleChange, errorMessage, value } = useField<File | null>(
  'image',
  undefined,
  {
    initialValue: null
  }
)
const blogCover = ref<HTMLImageElement | null>(null)
// display image when it's selected
watch(value, () => {
  if (value.value) {
    const reader = new FileReader()
    reader.onload = function (e: ProgressEvent<FileReader>) {
      blogCover!.value!.src = (e?.target?.result as string) ?? ''
    }
    reader.readAsDataURL(value.value)
  }
})
</script>
<template lang="html">
  <FormItem class="grid justify-start w-full items-center gap-1.5">
    <Label for="picture" class="mb-2 bg-" :class="{ 'text-red-600': Boolean(errorMessage) }">
      Blog Cover</Label
    >
    <label
      class="relative w-auto flex border p-2 rounded-lg cursor-pointer items-center"
      for="picture"
    >
      <span v-if="!value" class="flex items-center justify-center px-2">
        <UploadOutlined class="size-6 text-muted-foreground" />
      </span>
      <span class="flex flex-col">
        <img
          v-if="value"
          src=""
          ref="blogCover"
          class="w-full shadow-lg rounded-lg h-auto object-cover"
        />
        <span class="text-sm truncate text-gray-600 mt-4 text-center">
          {{ value ? value.name : 'Choose image' }}
        </span>
      </span>

      <Input
        accept="image/*"
        id="picture"
        type="file"
        class="pl-10 cursor-pointer hidden bg-green-600"
        @change="handleChange"
        @blur="handleBlur"
      />
    </label>
    <p v-if="Boolean(errorMessage)" class="text-sm font-medium text-destructive">
      {{ errorMessage }}
    </p>
  </FormItem>
</template>
