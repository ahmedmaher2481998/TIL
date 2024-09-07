<script setup lang="ts">
import { DarkModeFilled, LightModeFilled } from '@vicons/material'
import { Button, UserMenu } from '@/components'
import { useAuth, usePopUp } from '@/stores'
import { NoteAltOutlined } from '@vicons/material'
import { storeToRefs } from 'pinia'
const { AuthStoreState } = storeToRefs(useAuth())
import { useDarkMode } from '@/composable/useDarkMode'
const { openView } = usePopUp()
const { toggleDark, isDark } = useDarkMode()
</script>

<template>
  <nav class="w-full px-10 items-center  shadow-lg text-white sticky">
    <div class="w-full container flex min-h-20 pt-4 p-2 items-center justify-between">
      <router-link to="/" class="font-bold text-primary font-main">Blogy</router-link>
      <div class="text-white flex items-center justify-center">
        <!-- toggle dark mode  -->
        <Button variant="outline" class="flex justify-center items-center" size="icon" @click="toggleDark">
          <transition name="fade" mode="out-in">
            <DarkModeFilled v-if="isDark" class="w-6 h-6 text-foreground" />
            <LightModeFilled v-else class="w-6 h-6 text-foreground" />
          </transition>
        </Button>
        <!-- logged-in show logout & create new blog post  -->
        <div v-if="AuthStoreState.isAuth" class="flex">
          <RouterLink to="/new" class=" mx-2">
            <Button class="flex gap-1 md:gap-3 " variant="ghost">
              write
              <NoteAltOutlined class="h-6 w-6" />
            </Button>
          </RouterLink>
          <UserMenu :name="AuthStoreState.name" :avatar="AuthStoreState.avatar" />
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
