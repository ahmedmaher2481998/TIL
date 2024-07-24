<script setup lang="ts">
import { NavBar, Toaster } from '@/components'
</script>

<template>
  <Toaster />
  <header>
    <NavBar />
  </header>
  <RouterView />
</template>

<style scoped></style>
