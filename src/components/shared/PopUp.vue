<script setup lang="ts">
import { Dialog } from '@/components'
import { storeToRefs } from 'pinia'

import { usePopUp } from '@/stores'

const { open, viewComponent } = storeToRefs(usePopUp())
</script>

<template>
  <Dialog v-model:open="open">
    <!-- Component changes when view in popup store changes  -->
    <component :is="viewComponent"></component>
  </Dialog>
</template>
