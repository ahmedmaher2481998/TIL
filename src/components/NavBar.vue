<script setup lang="ts">
import { Button } from '@/components'
import { useAuth } from '@/stores/authStore'
import { usePopUp } from '@/stores/popUpStore'
import { NoteAltOutlined } from '@vicons/material'
const { logIn, isAuth } = useAuth()
const { openView } = usePopUp()
</script>

<template>
  <nav class="w-full px-10 items-center bg-zinc-800 shadow-lg text-white sticky">
    <div class="w-full container flex min-h-20 pt-4 mb-6 p-2 items-center justify-between">
      <router-link to="/" class="font-bold font-main">Blogy</router-link>
      <div class="text-white flex items-center justify-center space-x-6">
        <Button v-if="isAuth" variant="ghost" @click="openView('logout')"> log out </Button>
        <div v-else>
          <Button variant="ghost" @click="openView('register ')"> register </Button>
          <Button variant="ghost" @click="openView('login')"> log in </Button>
        </div>
        <RouterLink :to="{ name: 'new' }">
          <Button class="flex gap-3" variant="ghost">
            new Blog
            <NoteAltOutlined class="h-6 w-6" />
          </Button>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
