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
import { useAuth, usePopUp } from '@/stores'
import { ref } from 'vue'
const { logout } = useAuth()
const { closeCurrentView } = usePopUp()
</script>

<template>
  <!-- <DialogContent class="sm:max-w-[425px] border-muted text-muted "> -->
  <DialogFooter>
    <Button type="button" variant="default" class="" @click="closeCurrentView">
      cancel
    </Button>
    <Button type="button" variant="destructive" @click="logout">logout </Button>
  </DialogFooter>
  <!-- </DialogContent> -->
</template>
