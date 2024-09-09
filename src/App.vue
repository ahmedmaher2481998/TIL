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
  <footer class="bg-muted dark:bg-muted-foreground/10 py-8">
    <div class="container flex flex-col items-center justify-between gap-4 md:flex-row">
      <div class="text-sm text-muted-foreground">&copy; 2024 Blogy. All rights reserved.</div>
      <div class="flex items-center gap-4">
        <RouterLink to="#" class="text-sm font-medium hover:underline" prefetch={false}>
          Twitter
        </RouterLink>
        <RouterLink to="#" class="text-sm font-medium hover:underline" prefetch={false}>
          Instagram
        </RouterLink>
        <RouterLink to="#" class="text-sm font-medium hover:underline" prefetch={false}>
          Newsletter
        </RouterLink>
      </div>
    </div>
  </footer>

  <!-- <footer class="w-full my-auto  text-primary items-center justify-center flex h-24 p-6">
    all rights reserved blogy 2024&copy;
  </footer> -->
</template>

<style scoped></style>
