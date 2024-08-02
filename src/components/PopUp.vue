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
  Label,
  LoginPopUp
} from '@/components'
import { storeToRefs } from 'pinia'

import { usePopUp } from '@/stores/popUpStore'

import { KeepAlive } from 'vue'
const popUp = usePopUp()
const { open, viewComponent } = storeToRefs(popUp)
</script>

<template>
  <Dialog v-model:open="open">
    <!-- Component changes when view in popup store changes  -->
    <KeepAlive>
      <component :is="viewComponent"></component>
    </KeepAlive>
  </Dialog>
</template>
