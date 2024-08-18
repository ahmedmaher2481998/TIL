<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components'
import { getInitials } from '@/utils'
import { withDefaults, defineProps } from 'vue'

interface PropsInterface {
  name: string
  avatar: string
  displayName: boolean
}

// Define props with or without defaults
const props = withDefaults(defineProps<PropsInterface>(), {
  name: '',
  avatar: '',
  displayName: true
})
</script>

<template>
  <div class="flex items-center gap-3 mr-auto">
    <Avatar>
      <AvatarImage :src="props.avatar" />
      <AvatarFallback>
        {{ getInitials(props.name) }}
      </AvatarFallback>
    </Avatar>
    <p v-if="displayName">
      {{ props.name }}
    </p>
  </div>
</template>

<style scoped></style>
