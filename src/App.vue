<script setup lang="ts">
import { NavBar, Toaster, PopUp } from '@/components'
</script>

<template>
  <Toaster />
  <PopUp />
  <header class="pb-10 ">
    <NavBar />
  </header>
  <div class="min-h-screen">
    <RouterView />

  </div>

  <footer class="w-full my-auto  text-primary items-center justify-center flex h-24 p-6">
    all rights reserved Ahmed maher 2024&copy;
  </footer>
</template>

<style scoped></style>
