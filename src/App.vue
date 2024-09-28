<script setup lang="ts">
import { NavBar, PopUp, Toaster, TransitionWrapper } from '@/components';
import Lenis from 'lenis'
/* set up smooth scrolling with lenis  */
const lenis = new Lenis()
// lenis.on('scroll', (e) => {
//   // console.log(e)
// })

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

</script>

<template>
  <Toaster />
  <PopUp />
  <header class=" ">
    <NavBar />
  </header>
  <div class="min-h-screen pt-14 md:container">
    <RouterView v-slot="{ Component }">
      <TransitionWrapper>
        <component :is="Component" />
      </TransitionWrapper>
    </RouterView>

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

<style>
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-smooth iframe {
  pointer-events: none;
}
</style>
