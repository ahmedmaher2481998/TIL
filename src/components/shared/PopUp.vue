<script setup lang="ts">
import { DialogContent, Dialog, DialogHeader, DialogTitle, DialogDescription } from '@/components'
import { storeToRefs } from 'pinia'

import { usePopUp } from '@/stores'

const { open, viewComponent, popUpTitle, popUpDescription } = storeToRefs(usePopUp())
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[425px] border-muted  ">
      <DialogHeader>
        <DialogTitle>{{ popUpTitle }}</DialogTitle>
        <DialogDescription>
          {{ popUpDescription }}
        </DialogDescription>
      </DialogHeader>

      <!-- Component changes when view in popup store changes  -->
      <component :is="viewComponent"></component>
    </DialogContent>
  </Dialog>
</template>
