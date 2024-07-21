<script setup lang="ts">
import Button from '@/components/ui/button/index'
import { NoteAltOutlined } from "@vicons/material"
</script>

<template>
  <nav class="w-full px-10 items-center bg-zinc-800 shadow-lg text-white sticky">
    <div class="w-full container flex min-h-20   pt-4 mb-6 p-2 items-center justify-between">
      <router-link to="/" class="font-bold font-main">Blogy</router-link>
      <RouterLink class="text-white flex gap-3" :to="{ name: 'new' }">
        new Blog
        <NoteAltOutlined class="h-6 w-6" />
      </RouterLink>
    </div>
  </nav>
</template>
