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
import { useAuth } from '@/stores/authStore'
import { ref } from 'vue'
const { logIn } = useAuth()
const email = ref('')
const password = ref('')
</script>

<template>
  <DialogContent class="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>login to your account</DialogTitle>
      <DialogDescription>
        personalize your experience ,explore & write your fav content.
      </DialogDescription>
    </DialogHeader>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right"> email </Label>
        <Input id="tag" v-model="email" type="email" class="col-span-3" required />
      </div>

      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right"> password </Label>
        <Input id="tag" v-model="password" type="password" class="col-span-3" required />
      </div>
    </div>
    <DialogFooter>
      <Button type="button" @click="logIn"> login </Button>
    </DialogFooter>
  </DialogContent>
</template>
