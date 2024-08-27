<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label
} from '@/components'
import { useTags } from '@/stores'
import { AddFilled } from '@vicons/material'
import { ref } from 'vue'
const { createNewTag } = useTags()
const tagTitle = ref('')
const addNewTag = () => {
  // console.log("submitting", tagTitle.value)
  if (tagTitle.value) {
    createNewTag(tagTitle.value)
    tagTitle.value = ''
    open.value = false
  }
}
const open = ref(false)
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button type="button" class="my-4" variant="outline">
        <AddFilled class="h-6 w-6" /> tag
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>create new tag</DialogTitle>
        <DialogDescription>
          please only add tag if it's not existing in the current tags.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> tag </Label>
          <Input id="tag" v-model="tagTitle" class="col-span-3" required />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" @click="addNewTag"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
