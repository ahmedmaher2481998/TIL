<script setup lang="ts">
import Button from '@/components/ui/button/index'
</script>

<template>
  <nav class="w-full bg-zinc-800 shadow-lg text-white sticky">
    <div class="w-full container flex pt-4 mb-6 p-2 items-center justify-between">
      <router-link to="/" class="font-bold font-main">Blogy</router-link>
      <Button>Create new Blog</Button>
    </div>
  </nav>
</template>
