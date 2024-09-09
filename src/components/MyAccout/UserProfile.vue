<script setup>
import { useAuth } from '@/stores';
import { getInitials } from '@/utils';
import { storeToRefs } from 'pinia';
import { Avatar, AvatarFallback, AvatarImage } from '@/components'
const auth = useAuth()
const { AuthStoreState } = storeToRefs(auth)
</script>
<template>
  <div>
    <div>
      <Avatar class="h-20 w-20 border">
        <AvatarImage :src="AuthStoreState.avatar" :alt="AuthStoreState.name" />
        <AvatarFallback>
          {{ getInitials(AuthStoreState.name) }}
        </AvatarFallback>
      </Avatar>
      <h2 class="mt-4 text-2xl font-bold">{{ AuthStoreState.name }}</h2>
      <p class="mt-2 text-muted-foreground">{{ AuthStoreState.email }}</p>
    </div>
  </div>
</template>
