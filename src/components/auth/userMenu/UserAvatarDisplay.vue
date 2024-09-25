<script setup lang="ts">
import { UserAvatarDisplayContent } from '@/components'

interface PropsInterface {
  name: string
  avatar: string
  displayName?: boolean, ago?: string,
  size?: 'sm' | 'base' | 'lg',
  classes?: string,
  authorId?: string
}

// Define props with or without defaults
const props = withDefaults(defineProps<PropsInterface>(), {
  name: '',
  avatar: '',
  displayName: true,
  ago: '',
  size: 'sm',
  classes: '',
  authorId: undefined
})
// Map size to specific CSS classes

</script>

<template>
  <router-link class="block h-full w-full " v-if="authorId" :to="`/author/${authorId}`">

    <UserAvatarDisplayContent :name="name" :avatar="avatar" :display-name="props.displayName" :ago="props.ago"
      :size="props.size" :classes="props.classes" />

  </router-link>
  <template v-else>
    <UserAvatarDisplayContent :name="name" :avatar="avatar" :display-name="props.displayName" :ago="props.ago"
      :size="props.size" :classes="props.classes" />
  </template>


</template>

<style scoped></style>
