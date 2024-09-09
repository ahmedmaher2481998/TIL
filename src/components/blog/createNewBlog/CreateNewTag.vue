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
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
const tagStore = useTags()
const { tags } = storeToRefs(tagStore)
const tagTitle = ref('')
const duplicateCreation = ref(false)
const addNewTag = () => {

  if (tagTitle.value) {
    if (tags.value.tags.every(t => t.title.replace(/\s+/g, '').toLowerCase() !== tagTitle.value.replace(/\s+/g, '').toLowerCase())) {
      duplicateCreation.value = false
      tagStore.createNewTag(tagTitle.value)
      tagTitle.value = ''
      open.value = false
    } else {
      duplicateCreation.value = true
    }
  }
}
const open = ref(false)
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button type="button" class="my-4" variant="outline">
        <Plus class="h-6 w-6" /> tag
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
      <p v-if="duplicateCreation" class="text-destructive-foreground">
        this tag already exists
      </p>
      <DialogFooter>
        <Button type="button" @click="addNewTag"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
