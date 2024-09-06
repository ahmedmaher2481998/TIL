<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components'
import { getInitials } from '@/utils'

interface PropsInterface {
  name: string
  avatar: string
  displayName?: boolean, ago?: string
}

// Define props with or without defaults
const props = withDefaults(defineProps<PropsInterface>(), {
  name: '',
  avatar: '',
  displayName: true,
  ago: ''
})
</script>

<template>
  <div class="flex items-center gap-2 text-sm text-muted-foreground">
    <Avatar class="h-6 w-6 border">
      <AvatarImage :src="props.avatar" :alt="props.name" />
      <AvatarFallback>{{ getInitials(props.name) }}</AvatarFallback>
    </Avatar>
    <p v-if="displayName">
      {{ props.name }}
    </p>
    <template v-if="ago !== ''">

      <span>•</span>
      <span>{{ ago }}</span>
    </template>
  </div>

</template>

<style scoped></style>
