<script setup lang="ts">
import { FormItem, Input } from '@/components'
import { Upload } from 'lucide-vue-next';
import { type ClassValue } from 'clsx'
import { useField } from 'vee-validate'
import { computed, ref, toRefs, watch } from 'vue'

type propsType = {
  title: string
  name: string
  displayClasses?: ClassValue,

}
const props = withDefaults(defineProps<propsType>(), {
  displayClasses: ''
})
const { title, name } = toRefs(props)

const { handleBlur, handleChange, errorMessage, value } = useField<File | null>(name, undefined, {
  initialValue: null
})
const blogCover = ref<HTMLImageElement | null>(null)
// FIXME 
// display image when it's selected
watch(value, () => {

  if (value.value instanceof File) {
    const reader = new FileReader()
    reader.onload = function (e: ProgressEvent<FileReader>) {
      if (blogCover.value) {
        blogCover.value.src = e.target?.result as string || ''
      }
    }
    reader.readAsDataURL(value.value)
  }
})
</script>
<template lang="html">
  <FormItem class="grid justify-start text-foreground space-y-0 mt-8 w-full items-center gap-1.5">
    <label :for="name" class="pb-2 capitalize" :class="{ 'text-red-600': Boolean(errorMessage) }">
      {{ title }}</label>
    <label class="relative  bg-input  w-auto flex border p-2 rounded-lg cursor-pointer items-center justify-center"
      :for="name">
      <span v-if="!value" class="h-full 00 flex items-center justify-center px-2">
        <Upload class="size-6 " />
      </span>
      <span class="flex flex-col items-center justify-center ">
        <img v-if="Boolean(value)" src="" ref="blogCover" class="shadow-lg rounded-lg object-cover max-w-sm"
          :class="displayClasses ? displayClasses : 'w-full h-auto'" />
        <span :class="`text-sm truncate  text-center ${value ? 'mt-4' : ''}`">
          {{ value ? value.name : 'Choose image' }}
        </span>
      </span>

      <Input accept="image/*" :id="name" type="file" class="pl-10 cursor-pointer hidden " @change="handleChange"
        @blur="handleBlur" />
    </label>
    <p v-if="Boolean(errorMessage)" class="text-sm font-medium text-destructive">
      {{ errorMessage }}
    </p>
  </FormItem>
</template>
