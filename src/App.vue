<script setup lang="ts">
import { NavBar, Toaster, PopUp } from '@/components'
</script>

<template>
  <Toaster />
  <PopUp />
  <header>
    <NavBar />
  </header>
  <Suspense>
    <template #fallback>
      <div>Loading...</div>
    </template>
    <RouterView />
  </Suspense>

  <footer
    class="w-full my-auto bg-primary text-primary-foreground items-center justify-center flex h-24 p-6"
  >
    all rights reserved Ahmed maher 2024&copy;
  </footer>
</template>

<style scoped></style>
