<script setup lang="ts">
import { Button, UserMenu } from '@/components'
import { useAuth } from '@/stores/authStore'
import { usePopUp } from '@/stores/popUpStore'
import { NoteAltOutlined } from '@vicons/material'
import { storeToRefs } from 'pinia'
const { isAuth, user } = storeToRefs(useAuth())
const { openView } = usePopUp()
</script>

<template>
  <nav class="w-full px-10 items-center bg-zinc-800 shadow-lg text-white sticky">
    <div class="w-full container flex min-h-20 pt-4 mb-6 p-2 items-center justify-between">
      <router-link to="/" class="font-bold font-main">Blogy</router-link>
      <div class="text-white flex items-center justify-center space-x-6">
        <!-- logged-in show logout & create new blog post  -->
        <div v-if="isAuth" class="flex">
          <RouterLink to="/new">
            <Button class="flex gap-3" variant="ghost">
              new Blog
              <NoteAltOutlined class="h-6 w-6" />
            </Button>
          </RouterLink>
          <UserMenu :user="user" />
        </div>
        <!-- logged-in show login ot register   -->
        <div v-else>
          <Button variant="ghost" @click.stop="openView('register ')"> register </Button>
          <Button variant="ghost" @click.stop="openView('login')"> log in </Button>
        </div>
      </div>
    </div>
  </nav>
</template>
